import React from 'react';

const VehicleCard = ({ year, brand, model, trim, onDelete }) => {
  return(
    <div className="col s12 m6 l4">
      <div className="vehicle-card box-shadow margin-top-20">
        <h6>
          <span className="capitalize">{brand}</span> - <span className="capitalize">{model}</span>
        </h6>
        <p>{trim}</p>
        <p>{year}</p>
        <a className="box-edit btn btn-floating" onClick={onDelete}>
          <i className="material-icons">delete</i>
        </a>
      </div>
    </div>
  )
}

export { VehicleCard };
