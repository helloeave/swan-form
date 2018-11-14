/* eslint-disable no-alert, react/prefer-stateless-function */
import React, { Component } from 'react';
import { Field, Radios } from '@swan-form/field';
import { Slide, Slider } from '@swan-form/slider';
// import '@swan-form/slider/dist/Slider.css';
// import '@swan-form/slider/dist/Slide.css';
import { hot } from 'react-hot-loader';

const required = value => (value !== null && value !== undefined && value.trim() !== '' ? false : 'Required');
const onSubmit = values => {
  alert(JSON.stringify(values));
  return values;
};
const beforeSubmit = values =>
  Promise.resolve(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: values[key].toUpperCase() }), {}));

class SliderForm extends Component {
  render() {
    return (
      <div>
        <Slider beforeSubmit={beforeSubmit} onSubmit={onSubmit}>
          <Slide>
            <div>
              <h1>A first question</h1>
              <Field
                type="text"
                name="first-question"
                validate={required}
                size={50}
                placeholder="This field is required"
              />
              <p>
                This slider has five slides. This one, two that we skip, and one with a submit button. After we{' '}
                <em>press</em> submit, we transform the value in the first to an uppercase string (
                <code>beforeSubmit</code>) that is passed to the actual submit (<code>onSubmit</code>) that is then
                logged to the console in the after submit method (<code>afterSubmit</code>
                ).
              </p>
            </div>
          </Slide>
          <Slide>
            <div>
              <h1>A second question</h1>
              <Field
                name="first-question-a"
                placeholder="This field is required"
                size={50}
                type="text"
                validate={required}
              />
              <p>This is just another random question.</p>
            </div>
          </Slide>
          <Slide
            beforeExitToNext={({ getFormValues }) =>
              new Promise(res => {
                console.log('In beforeExitToNext hook');
                alert(`You chose ${getFormValues().decisionTree}`);
                res();
              })
            }
          >
            <div>
              <h2>Decision Tree</h2>
              <p>
                Here are two radio buttons. If you choose the first one, you&apos;ll see the next slide and skip the one
                after that. If you choose the other one, you&apos;ll see the reverse.
              </p>
              <Radios
                validate={required}
                name="decisionTree"
                options={[{ label: 'Next Slide', value: '0' }, { label: 'The Other One', value: '1' }]}
              />
            </div>
          </Slide>
          <Slide shouldShowIf={({ decisionTree }) => decisionTree === '0'}>
            <div>
              <h2>You chose the first slide.</h2>
              <p>(This is a static message, in case you&apos;re wondering).</p>
            </div>
          </Slide>
          <Slide shouldShowIf={({ decisionTree }) => decisionTree === '1'}>
            <div>
              <h2>You skipped the last slide.</h2>
              <p>(This is a static message, in case you&apos;re wondering).</p>
            </div>
          </Slide>
          <Slide>
            <h2>A static slide</h2>
            <p>
              This is a static slide. There is no need to set values in forms, so we don&apos;t need to use a render
              prop.
            </p>
          </Slide>
          <Slide
            render={props => (
              <div>
                <h2>These are all the values that were chosen</h2>
                <pre>{JSON.stringify(props.getFormValues(), null, 2)}</pre>
              </div>
            )}
          />
          <Slide shouldShowIf={() => false}>
            This will never show, and the submit action should happen as we press next.
          </Slide>
        </Slider>
      </div>
    );
  }
}

export default hot(module)(SliderForm);
