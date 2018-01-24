/* global document, window */
/* eslint-disable react/prop-types, react/sort-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';

import autobind from '@flow-form/helpers/dist/autobind';
import runValidations from '@flow-form/helpers/dist/runValidations';
import noErrors from '@flow-form/helpers/dist/noErrors';
import hasErrors from '@flow-form/helpers/dist/hasErrors';
import noop from '@flow-form/helpers/dist/noop';
import moveCursorToEnd from '@flow-form/helpers/dist/moveCursor';
import { ENTER } from '@flow-form/helpers/dist/keyCodes';

const undefinedOrNull = val => val === undefined || val === null;

/**
 * Wraps a component to treat it like a field (a controlled input)
 *
 * This can be used to create complex fields as well
 *
 * @param  {React.Component|React.Element} WrappedComponent The component to turn into a field
 * @param  {Object} wrapperOptions   [description]
 * @return {[type]}                  [description]
 */
function asField(WrappedComponent, wrapperOptions = {}) {
  const HOC = class extends Component {
    constructor(props) {
      super(props);

      // We'll cache this because it's used in a few places and should not change
      this.isMultipleSelect = props.type === 'select' && props.multiple === true;

      // Establish the initial state
      const state = {
        value: props.value || (this.isMultipleSelect ? [''] : ''),
        errors: noErrors,
        isValid: !hasErrors(runValidations(props.validate, props.value)),
        isDirty: false,
        isTouched: false,
      };

      // Setup the state, and also setup the initialState in case we get a queue to reset
      this.state = { ...state };
      this.initialState = { ...state };

      // This is used for debouncing validate functions while typing
      this.debounceValidateTimer = null;

      autobind(this, [
        // Bind some handlers for use with events
        'onChange',
        'onClick',
        'onBlur',
        'onFocus',
        'setRef',
        'getRef',
        // Bind these so that parental compenents can use them
        'getValue',
        'setValue',
        // In case we need to reset the field
        'reset',
        'validate',
        'runValidations',
        'isValid',
        'preventSubmitOnEnter',
      ]);
    }

    getChildContext() {
      // @todo figure out this registered wrapped thing
      if (wrapperOptions.registerWrapped !== false) {
        return {
          registerField: this.props.registerWrapped === true ? this.register : noop,
          unregisterField: this.props.registerWrapped === true ? this.register : noop,
          // autoComplete: this.context.autoComplete, // this might already be passed through
        };
      }
      // Pass through this context. The existence of this method somewhat messes with it.
      return this.context;
    }

    componentDidMount() {
      // Register with the any higher component that needs to keep track of this field
      this.register();

      // Emulate the browser autoFocus if (1) requested and (2) possible
      if (this.props.autoFocus && this.fieldRef) {
        // Actually focus on the field
        this.fieldRef.focus();
        // Move the cursor to the end of the input if there is a value
        moveCursorToEnd(this.fieldRef);
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (this.props === nextProps && this.state === nextState) {
        return false;
      }

      if (this.state.value !== nextState.value) {
        return true;
      }

      if (!isEqual(this.state.errors, nextState.errors)) {
        return true;
      }

      return false;
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.fieldRef && this.fieldRef.selectionStart) {
        if (Array.isArray(this.state.cursor) && !isEqual(prevState.cursor, this.state.cursor)) {
          const [start, end] = this.state.cursor;
          this.fieldRef.selectionStart = start;
          this.fieldRef.selectionEnd = end;
        }
      }
    }

    componentWillUnmount() {
      // Since we're unmounting, unregister from any higher components — this
      // means that the value will no longer be available
      this.unregister();
    }

    /** **************************************************************************
     * Registrations Methods
     *
     * Fields register with whatever controls them. So, if they are within a form,
     * the form can act on all of the fields (via bound functions passed by
     * context). This enables things like forms to get all the values for a submit
     * action or to pass all the values to determine if a slide should show, etc..
     *************************************************************************** */

    /**
     * Use the registration function passed by context
     * @return {void}
     */
    register() {
      if (isFunction(this.context.registerField) && wrapperOptions.registerWrapper !== false) {
        this.context.registerField({
          // This should be a unique key
          name: this.props.name,
          // In case we need to grab the ref @TODO maybe remove
          getRef: this.getRef,
          // Gets the value from the field
          getValue: this.getValue,
          // setValue can be useful for overwriting a value
          setValue: this.setValue,
          // The form must call all the validation functions synchronously
          validate: this.validate,
          // Runs the validation functions to see if the field is valid
          isValid: this.isValid,
          // Resets the field
          reset: this.reset,
        });
      }
    }

    /**
     * Use the unregistration function passed by context
     * @return {void}
     */
    unregister() {
      if (isObject(this.context) && isFunction(this.context.unregisterField)) {
        this.context.unregisterField(this.props.name);
      }
    }

    /**
     * Handlers
     */

    /**
     * Handles changes in value for the component
     *
     * Since, this handles all field types,
     *
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    onChange(event) {
      const { value } = event.target;
      const { validateWhileTyping, validateDebounceTimeout } = this.props;

      if (validateWhileTyping) {
        // If we are to validate while typing, then we'll debunce it. Basically, just set a timeout,
        // and, on each change event, clear the timeout and set a new one. The last one will go
        // through. This should help by not showing errors too early or, if there is a remote call
        // for the validation, not making too many worthless ajax requests
        window.clearTimeout(this.debounceValidateTimer);
        this.debounceValidateTimer = setTimeout(() => this.validate(), validateDebounceTimeout);
      }

      // If this is `<input type='select' multiple, then our values are arrays and need to be
      // handled differently.
      if (this.isMultipleSelect) {
        // Grab the options off of event.target and cycle through all of them, this is an
        // HTMLOptionsCollection, but it's iterable.
        const { options } = event.target;

        const values = [];
        for (let i = 0; i < options.length; i++) {
          // Grab all the options that are selected
          if (options[i].selected) {
            values.push(options[i].value);
          }
        }
        // Only update the state value if the arrays are actually different
        // @TODO consider removing this or doing something better (possible performance drain)
        if (!isEqual(this.state.value, values)) {
          this.setValue(values);
        }
      } else if (this.state.value !== value) {
        // Only run the setState method if the value is actually different
        this.setValue(value);
      }
    }

    onClick(event) {
      const { target } = event;
      const { onClick } = this.props;
      if (isFunction(onClick)) {
        onClick(target);
      }
    }

    /**
     * Event Handlers
     */

    onFocus(event) {
      const { onFocus } = this.props;
      const { target } = event;

      // On most fields, add in a handler to prevent a form submit on enter
      if (!['textarea', 'button', 'submit', 'reset'].includes(this.props.type)) {
        document.addEventListener('keydown', this.preventSubmitOnEnter, false);
      }

      // If this field has yet to be touched, then set it as touched
      if (this.state.isTouched === false) {
        this.setState(prevState => ({
          ...prevState,
          isTouched: true,
        }));
      }

      // Call user supplied function if given
      if (isFunction(onFocus)) {
        onFocus(target);
      }
    }

    onBlur(event) {
      const { onBlur, validate, asyncValidate } = this.props;
      const { target } = event;

      if (!['textarea', 'button', 'submit', 'reset'].includes(this.props.type)) {
        document.removeEventListener('keydown', this.preventSubmitOnEnter);
      }

      if (asyncValidate && validate) {
        this.validate();
      }

      // Call user supplied function if given
      if (isFunction(onBlur)) {
        onBlur(target);
      }
    }

    /**
     * [preventSubmitOnEnter description]
     *
     * @todo maybe change the name of this function. Really, it's to prevent
     *       forms from submitting, but it can be used for other things.
     *
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    preventSubmitOnEnter(event) {
      const { target } = event;
      if (event.keyCode === ENTER) {
        event.preventDefault();
        if (isFunction(this.props.handleEnterKey)) {
          this.props.handleEnterKey(target);
        }
        if (isFunction(this.context.handleEnterKey)) {
          // Can be used by the `form` component to move through fields, or for other things
          this.context.handleEnterKey(target);
        }
      }
    }

    /**
     * Refs
     */

    setRef(el) {
      const { setRef } = this.props;
      // If setRef was sent to to the component as a prop, then also call it with the element
      if (setRef && isFunction(setRef)) {
        setRef(el);
      }
      this.fieldRef = el;
    }

    getRef() {
      return this.fieldRef;
    }

    /**
     * Value Functions
     */

    /**
     * Gets the value of the field
     *
     * A bound version of this method is sent with the register method so that any component that
     * controls this field can access its value.
     *
     * @return {any} the value of the field
     */
    getValue() {
      return this.unformat(this.state.value);
    }

    /**
     * Set the value of the field
     *
     * This is a different method because (1) a bit of code reuse, but more importantly (2) the parent
     * a parent component might want to force update the value, hence, we provide a backdoor to the
     * setState method. This will be sent as part of the callback in the `register` method, so that
     * anything that this registers with shall have access to update the value.
     *
     * @todo  the
     *
     * @param {any} value the value to set
     */
    setValue(value, resetErrors = false, resetTouched = false) {
      const { name, type, onChange } = this.props;

      this.setState(prevState => {
        const formatted = this.format(value, prevState.value);

        let newValue = formatted;

        let cursorStart;
        let cursorEnd;

        if (this.fieldRef && this.fieldRef.selectionStart) {
          cursorStart = this.fieldRef.selectionStart;
          cursorEnd = this.fieldRef.selectionEnd;
        }

        if (Array.isArray(formatted)) {
          const [val, start, end] = formatted;
          newValue = val;
          if (this.fieldRef && this.fieldRef.selectionStart) {
            cursorStart = undefinedOrNull(start) ? cursorStart : start;
            cursorEnd = undefinedOrNull(end) ? cursorEnd : end;
          }
        }

        // we need to store the cursor in case they deleted something not from the end
        const cursor =
          this.unformat(value).length !== this.unformat(newValue).length
            ? [cursorStart, cursorEnd]
            : Array(2).fill(newValue.length);

        // Call user supplied function if given
        if (isFunction(onChange)) {
          onChange(newValue, name);
        }

        return {
          ...prevState,
          errors: resetErrors === false ? prevState.errors : [],
          value: newValue,
          isTouched: resetTouched !== true,
          isDirty: value !== this.props.value,
          value: type === 'text' ? newValue : value,
          cursor,
        };
      });
    }

    reset() {
      // Clobber the state by setting back to the initialState
      this.setState(this.initialState);
      // If we were provided a change function, then call it with the initial value
      if (isFunction(this.props.onChange)) {
        this.props.onChange(this.initialState.value, this.props.name);
      }
    }

    /**
     * Validation and Errors
     */

    validate() {
      return this.maybeUpdateErrors(this.runValidations());
    }

    runValidations() {
      return runValidations(this.props.validate, this.state.value);
    }

    isValid() {
      return !hasErrors(this.runValidations());
    }

    /**
     * [maybeUpdateErrors description]
     *
     * @todo  remove return values
     *
     * @param  {[type]} msg [description]
     * @return {[type]}     [description]
     */
    maybeUpdateErrors(msg) {
      if (msg === false) {
        if (this.state.errors.length !== 0) {
          this.setState(prevState => ({
            ...prevState,
            isValid: true,
            errors: noErrors,
          }));
        }
        // This means it is valid
        return true;
      }
      if (Array.isArray(msg) && msg.every(message => message === false)) {
        this.setState(prevState => ({
          ...prevState,
          isValid: true,
          errors: noErrors,
        }));
        return true;
      }
      this.setState(prevState => ({
        ...prevState,
        isValid: false,
        errors: Array.isArray(msg) ? msg : [msg],
      }));
      // This means it is not valid
      return false;
    }

    /**
     * Formatting
     */

    /**
     * Runs the value through a format function
     *
     * @todo  we might need to pass in more information here in order to deal with the formatters
     *        elegantly. Right now, for the google phone number example, pressing `backspace` on
     *        a delimter (eg, a paren surrounding an area code) returns the extact same string,
     *        but it should be deleting the last good number. Maybe we can get away with the
     *        onChange. Otherwise, we might have to do something else.
     *
     * @return {[type]} [description]
     */
    format(value, prevValue = '') {
      const { format } = this.props;

      if (this.fieldRef && this.fieldRef.selectionStart) {
        const start = this.fieldRef.selectionStart;
        const end = this.fieldRef.selectionEnd;

        if (isFunction(format)) {
          return format(value, prevValue, start, end);
        }
      }

      if (isFunction(format)) {
        return format(value, prevValue);
      }

      return value;
    }

    unformat(value) {
      const { unformat } = this.props;

      if (isFunction(unformat)) {
        return unformat(value);
      }

      return value;
    }

    render() {
      // We are going to pull out the internal things that we need and call the rest `spreadProps`,
      // and then we'll, well, spread throse props over the component below it.
      const {
        onChange,
        onBlur,
        onFocus,
        registerWrapped,
        value,
        asyncValidate,
        validate,
        validateWhileTyping,
        format,
        unformat,
        handleEnterKey,
        ...spreadProps
      } = this.props;

      if (this.context.autoComplete === 'off') {
        spreadProps.autoComplete = 'off';
      } else if (this.props.autoComplete) {
        spreadProps.autoComplete = this.props.autoComplete;
      }

      // Most modern browsers ignore the "off" value when trying to set a form, so we'll attempt a
      // workaround that may not work so well (applied to Chrome only for now).
      // See https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
      // for an explanation.
      //
      // @TODO consider taking this out and adding in a note in the README saying it won't work.
      //
      // If we update this condition to something other than Chrome, then we need to update the README.
      if (spreadProps.autoComplete === 'off') {
        if (global && global.navigator && global.navigator.appVersion.includes('Chrome')) {
          spreadProps.autoComplete = 'nope';
        }
      }

      return (
        <WrappedComponent
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onClick={this.onClick}
          setRef={this.setRef}
          value={this.state.value}
          errors={this.state.errors}
          isValid={this.state.isValid}
          {...spreadProps}
        />
      );
    }
  };

  HOC.displayName = `asField(${WrappedComponent.displayName || 'Component'})`;

  HOC.propTypes = {
    registerWrapped: PropTypes.bool,
  };

  HOC.defaultProps = {
    registerWrapped: true,
  };

  HOC.contextTypes = {
    registerField: PropTypes.func,
    unregisterField: PropTypes.func,
    autoComplete: PropTypes.oneOf(['on', 'off']),
  };

  HOC.childContextTypes = {
    registerField: PropTypes.func,
    unregisterField: PropTypes.func,
    autoComplete: PropTypes.oneOf(['on', 'off']),
  };

  return HOC;
}
export default asField;
