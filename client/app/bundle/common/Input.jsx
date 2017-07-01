import React from 'react';
import { Field } from 'redux-form'

const Input = (props) => {
  const { name, icon, type, value, error } = props
  return (
    <div className="input-field">
      <i className="material-icons prefix">{icon}</i>
      <Field id={`icon_${name}`} type={type} value={value} name={name} component="input" className={`validate ${error ? 'invalid' : ''}`} placeholder="" />
      <label className="capitalize" htmlFor={`icon_${name}`}>{name} <span className="red-text">{error ? error : ''}</span></label>
    </div>
  );
};

export { Input };
