import React from 'react';
import { Field } from 'redux-form'

const Input = (props) => {
  const { name, icon, type, error } = props
  return (
    <div className="input-field">
      <i className="material-icons prefix">{icon}</i>
      <Field id={`icon_${name}`} type={type} name={name} component="input" className={`validate ${error ? 'invalid' : ''}`} { ...props } />
      <label className="capitalize" htmlFor={`icon_${name}`}>{name} <span className="red-text">{error ? error : ''}</span></label>
    </div>
  );
};

export { Input };
