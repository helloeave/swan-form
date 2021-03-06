/* eslint-disable react/sort-comp */
import {
  classes,
  execIfFunc,
  FormContext,
  gatherErrors,
  isDefined,
  maybePromisify,
  alwaysFilteredArray,
  filterKeysFromObj,
  isFunction,
  memoize,
} from '@swan-form/helpers';

import * as React from 'react';

/**
 * Note, since the submit hooks rely on promises, and since promises are not cancelable,
 * we're wrapping handling them in checks to see if the component is mounted.
 * Facebook considers this an antipattern.
 *   (see https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html)
 *
 * But, since this is a library, we don't want to change how promises work.
 */

export interface FormProps {
  name: string;
  onSubmit(values: { [key: string]: any }): { [key: string]: any } | Promise<{ [key: string]: any }>;
  beforeSubmit?(values: { [key: string]: any }): { [key: string]: any } | Promise<{ [key: string]: any }>;
  afterSubmit?(values: { [key: string]: any }): any;
  onError?(error: string | Error | React.ReactNode | React.ReactNode[]): void;
  autoComplete?: boolean;
  persist?: boolean;
  style?: React.CSSProperties;
  className?: string;
  noValidate?: boolean;
  defaultValues?: { [key: string]: any };
  validate?(values: { [key: string]: any }): string | false | Promise<string | false>;
}

export interface FormState {
  isSubmitting: boolean;
  hasSubmitted: boolean;
  formErrors: React.ReactNode[];
}

export type RegisterType = {
  focus(): void;
  getValue(): void;
  name: string;
  reset(): void;
  setValue(value: any): void;
  validate(values: { [key: string]: any }, updateErrors: boolean): React.ReactNode[];
};

const emptyObject = {};
const emptyArray: any[] = [];

function getSpreadPropsValue(noValidate: boolean) {
  return isDefined(noValidate) ? { noValidate } : emptyObject;
}

const getSpreadProps = memoize(getSpreadPropsValue);

export class Form extends React.PureComponent<FormProps, FormState> {
  static displayName = 'Form';

  static defaultProps = {
    beforeSubmit: (values: { [key: string]: any } | Promise<{ [key: string]: any }>) => Promise.resolve(values),
    afterSubmit: (values: { [key: string]: any } | Promise<{ [key: string]: any }>) => Promise.resolve(values),
    // @ts-ignore
    onError: (error: string | Error | React.ReactNode | React.ReactNode[]) => {},
    autoComplete: true,
    defaultValues: {},
    formAutoComplete: true,
    noValidate: false,
    persist: false,
  };

  constructor(props: FormProps) {
    super(props);
    this.initialState = { isSubmitting: false, hasSubmitted: false, formErrors: emptyArray };
    this.state = { ...this.initialState };

    this.getFormInterface = memoize(this.getFormInterface.bind(this));
    this.formInterface = this.getFormInterface(this.state);
    this.mounted = false;
  }

  fields: { [key: string]: RegisterType } = {};

  persistedValues: { [key: string]: any } = {};

  mounted: boolean;

  initialState: FormState;

  formInterface: {
    defaultFormValues: { [key: string]: any };
    formAutoComplete: boolean;
    formErrors: any[];
    hasFormSubmitted: boolean;
    isFormSubmitting: boolean;
    registerWithForm(payload: any): void;
    unregisterFromForm(name: string): void;
  };

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * Function for fields to unregister from the form
   */
  registerWithForm = (payload: RegisterType) => {
    // Save the field to the internal registry
    this.fields[payload.name] = payload;
    // If we are to persist the values, then we'll restore them if we see the field appear again
    if (this.props.persist) {
      const previousValue = this.persistedValues[payload.name];
      if (isDefined(previousValue)) {
        payload.setValue(previousValue);
      }
    }
  };

  /**
   * We push this into the FormContext
   *
   * This is a function that we bind and memoize for renders. We feed `this.state` into it so that
   * the Context.Consumer will rerender.
   */
  getFormInterface(state: FormState) {
    return {
      defaultFormValues: this.props.defaultValues!,
      formAutoComplete: this.props.autoComplete!,
      formErrors: state.formErrors,
      getFormValues: this.getValues,
      hasFormSubmitted: state.hasSubmitted,
      isFormSubmitting: state.isSubmitting,
      registerWithForm: this.registerWithForm,
      unregisterFromForm: this.unregisterFromForm,
    };
  }

  /**
   * Function for fields to unregister from the form
   */
  unregisterFromForm = (name: string) => {
    const { [name]: fieldInterface, ...rest } = this.fields;
    this.fields = rest;
    // Save the value if we have the persist prop
    if (this.props.persist && fieldInterface && isFunction(fieldInterface.getValue)) {
      this.persistedValues[name] = fieldInterface.getValue();
    }
  };

  /**
   * Function to get all the form values
   */
  getValues = () => ({
    ...this.persistedValues,
    ...Object.keys(this.fields).reduce(
      (values: { [key: string]: any }, key: string) => ({ ...values, [key]: this.fields[key].getValue() }),
      {},
    ),
  });

  /**
   * Error handler for subbmit event
   */
  handleErrors = (errors: Error | React.ReactNode | React.ReactNode[]) => {
    const { onError } = this.props;
    // Force formErrors to be an array
    const formErrors = alwaysFilteredArray<React.ReactNode>(errors);
    // Persist the errors
    if (this.mounted) {
      this.setState({ formErrors, isSubmitting: false });
    }
    // Call the supplied error handler
    execIfFunc(onError, ...formErrors);
  };

  /**
   * Reset handler for the form
   */
  onReset = (event: React.FormEvent) => {
    event.preventDefault();
    // Reset the state
    this.setState({ ...this.initialState });
    // Remove persisted values
    this.persistedValues = {};
    // Call the reset method on each field
    Object.keys(this.fields).forEach((key: string) => this.fields[key].reset());
  };

  /**
   * Submit handler
   */
  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.doSubmit();
  };

  /**
   * Called at the start of the submit event
   */
  handleBeforeSubmit = (values: object | Promise<{ [key: string]: any }>): Promise<{ [key: string]: any }> => {
    const { beforeSubmit } = this.props;

    if (this.mounted) {
      this.setState({ isSubmitting: true });
    }

    return isFunction(beforeSubmit) ? maybePromisify(beforeSubmit(values)) : Promise.resolve(values);
  };

  /**
   * Called in the middle of the submit event
   */
  handleOnSubmit = (values: object | Promise<{ [key: string]: any }>): Promise<{ [key: string]: any }> => {
    const { onSubmit } = this.props;
    return isFunction(onSubmit) ? maybePromisify(onSubmit(values)) : Promise.resolve(values);
  };

  /**
   * Called after a successful submit
   */
  handleAfterSubmit = (values: object | Promise<{ [key: string]: any }>) => {
    const { afterSubmit } = this.props;
    if (this.mounted) {
      this.setState({ isSubmitting: false, hasSubmitted: true });
    }
    return isFunction(afterSubmit) ? maybePromisify(afterSubmit(values)) : Promise.resolve(values);
  };

  /**
   * Checks validation and then runs the submit lifecycle
   */
  doSubmit = (): Promise<{ [key: string]: any } | string | Error> | void => {
    const { validate } = this.props;

    // Validate each of the fields
    if (!this.validate()) {
      return this.handleErrors(['Form is not valid']);
    }

    // Grab all the values
    const values = this.getValues();

    // If the
    if (isFunction(validate)) {
      const errors = alwaysFilteredArray<React.ReactNode>(validate(values));

      if (errors.length) {
        return this.handleErrors(errors);
      }
    }

    this.setState({ isSubmitting: true, formErrors: [] });

    return this.handleBeforeSubmit(values)
      .then(this.handleOnSubmit)
      .then(this.handleAfterSubmit)
      .catch(this.handleErrors);
  };

  /**
   * Runs validation on all current fields
   */
  validate = () => gatherErrors(this.fields, true).length === 0;

  render() {
    const removeProps = [
      'afterSubmit',
      'beforeSubmit',
      'children',
      'className',
      'defaultFormValues',
      'defaultValues',
      'formAutoComplete',
      'name',
      'onSubmit',
      'persist',
      'validate',
    ];
    const { autoComplete, className, children, name, ...rest } = this.props;

    const props = filterKeysFromObj(rest, removeProps);
    return (
      <form
        {...getSpreadProps(this.props.noValidate!)}
        {...props}
        name={name}
        autoComplete={autoComplete ? 'on' : 'off'}
        onReset={this.onReset}
        onSubmit={this.onSubmit}
        className={classes('sf--form', className)}
      >
        <FormContext.Provider value={this.getFormInterface(this.state)}>{children}</FormContext.Provider>
      </form>
    );
  }
}

export { FormContext };

export default Form;
