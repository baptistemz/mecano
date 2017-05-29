import React from 'react';

const RadioButtons = ({ name, options }) => {
  return (
    <div className="space-between">
      {
        options.map(function(option, i){
          return(
            <p key={i}>
              <input name={ name } type="radio" id={ option } />
              <label htmlFor={ option }>{ option }</label>
            </p>
          )
        })
      }
    </div>
  );
};

export { RadioButtons };
