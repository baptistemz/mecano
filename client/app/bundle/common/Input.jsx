import React from 'react';
import { Field } from 'redux-form'

const Input = ({ name, icon, type }) => {
  return (
    <div className="input-field">
      <i className="material-icons prefix">{icon}</i>
      <Field id={`icon_${name}`} type={type} name={name} component="input" className="validate" />
      <label className="capitalize" htmlFor={`icon_${name}`}>{name}</label>
    </div>
  );
};

export { Input };
