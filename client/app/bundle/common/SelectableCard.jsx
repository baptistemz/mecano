import React from 'react';
import { Field } from 'redux-form'

const SelectableCard = ({ children, value, tags, picture }) => {
  return(
    <label className="col s12 m6 l4">
      <Field className='card-input' component="input" type="checkbox" name={value} value={value}/>
      <div className="selectable-card" style={{ backgroundImage: `url(${picture})` }}>
        <div className="selection-overlay">
          <i className="material-icons">done</i>
        </div>
        <div className="card-content">
          <h4>{children}</h4>
          {
            tags.map((tag)=>{
              return <p key={tag}>{tag}</p>
            })
          }
        </div>
      </div>
    </label>
  )
}

export { SelectableCard };
