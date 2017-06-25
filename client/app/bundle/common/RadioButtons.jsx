import React from 'react';
import { Field } from 'redux-form'

const RadioButtons = ({ name, options, label }) => {
  return (
    <div>
      <p className='text-center' style={{ marginBottom: 0 }}>{label}</p>
      <div className="justify-center">
        {
          options.map(function(option, i){
            return(
              <p key={i} style={{ margin: 0 }}>
                <Field className='radioinput' name={ name } component="input" type="radio" id={ option } value={ option } />
                <label htmlFor={ option }>{ option }</label>
              </p>
            )
          })
        }
      </div>
    </div>
  );
};

export { RadioButtons };
