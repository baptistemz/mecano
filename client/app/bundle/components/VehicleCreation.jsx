import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import carQueryConfig from '../utils/carQueryConfig';
import { Button } from '../common/index';
import { createVehicle } from '../actions/index';

class VehicleCreation extends Component {
  componentDidMount(){
    carQueryConfig()
  }
  manageInputs(){
    if(this.refs.model_not_found.checked){
      $('#model-select-group').css('display', 'none')
      $('#model-string-group').css('display', 'block')
    }else{
      $('#model-select-group').css('display', 'block')
      $('#model-string-group').css('display', 'none')
    }
  }

  gatherValues(){
    const {year, brand, model_select, model_string, model_not_found } = this.refs
    let trim = this.refs.trim.childNodes[0].innerHTML
    trim = (trim === "None" || model_not_found.checked) ? "" : trim;
    const model = model_not_found.checked ? model_string.value : model_select.value
    const values = {year: year.value, brand: brand.value, model , trim }
    console.log(values)
    return values
  }
  submit(e){
    e.preventDefault()
    this.props.createVehicle(this.gatherValues())
  }
  render(){
    const { handleSubmit, wholeForm } = this.props;
    return(
      <form onSubmit={(e) => this.submit(e)}>
        <div>
          <div className="row">
            <div className="col s12 m6 l3">
              <label htmlFor="year">Année</label>
              <select name="year" ref="year" id="year" />
            </div>
            <div className="col s12 m6 l3">
              <label htmlFor="brand">Contructeur</label>
              <select name="brand" ref="brand" id="brand" />
            </div>
            <div id="model-select-group">
              <div className="col s12 m6 l3">
                <label htmlFor="model_select">Modèle</label>
                <select name="model_select" ref="model_select" id="model_select" />
              </div>
              <div className="col s12 m6 l3">
                <label htmlFor="trim">Extension</label>
                <select name="trim" ref="trim" id="trim" />
              </div>
            </div>
            <div id="model-string-group">
              <div className="col s12 m12 l6">
                <label htmlFor="model_string">Modèle</label>
                <input name="model_string" ref="model_string" id="model_string" />
              </div>
            </div>
            <div className="col offset-l6 s12 l6">
              <p>
                <input type="checkbox" ref="model_not_found" id="model-not-found" onChange={() => this.manageInputs()} />
                <label htmlFor="model-not-found">Je ne trouve pas mon modèle.</label>
              </p>
            </div>
          </div>
        </div>
        <Button icon="drive" type="submit">enregistrer</Button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createVehicle }, dispatch);
}

export default connect(null, mapDispatchToProps)(VehicleCreation)
