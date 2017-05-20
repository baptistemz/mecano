import React from 'react';

const Input = (props) => {
  const englishLabel = props.englishLabel ? props.englishLabel : props.label
  return (
    <div className="input-field">
      <i className="material-icons prefix">{props.icon}</i>
      <input id={`icon_${englishLabel}`} type={`${props.type}`} className="validate" />
      <label className="capitalize" htmlFor={`icon_${englishLabel}`}>{props.label}</label>
    </div>
  );
};

export { Input };
