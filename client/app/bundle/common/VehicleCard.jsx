import React from 'react';

const VehicleCard = ({ year, brand, model, trim, onDelete }) => {
  return(
    <div className="col s12 m6 l4">
      <div className="vehicle-card">
        <h6>
          <span className="capitalize">{brand}</span> - <span className="capitalize">{model}</span>
        </h6>
        <p>{trim}</p>
        <p>{year}</p>
        <a className="box-edit btn btn-floating" onClick={onDelete}>
          <i className="material-icons">delete</i>
        </a>
        <i className="material-icons">directions_car</i>
      </div>
    </div>
  )
}

export { VehicleCard };
