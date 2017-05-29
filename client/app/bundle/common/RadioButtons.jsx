import React from 'react';
import { Field } from 'redux-form'

const RadioButtons = ({ name, options }) => {
  return (
    <div className="space-between">
      {
        options.map(function(option, i){
          return(
            <p key={i}>
              <Field name={ name } component="input" type="radio" id={ option } value={ option } />
              <label htmlFor={ option }>{ option }</label>
            </p>
          )
        })
      }
    </div>
  );
};

export { RadioButtons };
