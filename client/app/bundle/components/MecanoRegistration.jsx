import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { registerMecano, goToStep, registrationError } from '../actions/index';
import { Buttons, StepOne, StepTwo, StepThree} from './MecanoRegistrationSteps/index';
import { Header, Loader } from '../common/index';

class MecanoRegistration extends Component {
  //DON'T SUBMIT ON PRESSENTER IN AUTOCOMPLETE
  componentDidMount(){
    $('body').keypress(function(e){
      if (e.keyCode == '13') {
         e.stopPropagation();
       }
    });
  }
  submit(data){
    console.log(data)
  }
  nextStepCheck(){
    const { formData, step, registrationError, goToStep, mobile, pro } = this.props;
    if(formData.values){
      let ok = []
      formData.values.address ? ok.push("address") : registrationError({ address: "veuillez remplir ce champ"});
      formData.values.mobile ? ok.push("mobile") : registrationError({ mobile: "veuillez remplir ce champ"});
      formData.values.pro ? ok.push("pro") : registrationError({ pro: "veuillez remplir ce champ"});
      if(!pro){ok.push("rate")}else{ formData.values.rate ? ok.push("rate") : registrationError({ rate: "veuillez remplir ce champ"})  };
      if(!mobile){ok.push("radius")}else{ formData.values.radius ? ok.push("radius") : registrationError({ radius: "veuillez remplir ce champ"})  };
      if (step === 1){
        ok.length === 5 ? goToStep(2) : registrationError({ main: "des champs sont vides"})
      }
    }else{
      registrationError({ main: "veuillez remplir ce formulaire "})
    }
  }
  stepComponent(){
    const { step, mobile, pro, errors } = this.props;
    if(step === 1){
      return <StepOne mobile={ mobile } pro={ pro } errors={ errors } />
    }else if(step === 2){
      return <StepTwo />
    }else if(step === 3){
      return <StepThree />
    } else {
      return <StepOne mobile={ mobile } pro={ pro } />
    }
  }
  render(){
    const { handleSubmit, step, goToStep, errors } = this.props;
    console.log("IN COMPONENT", errors)
    return (
      <div>
        <Header>Enregistrement mécano {step}/3</Header>
        <div className="container">
          <div className="row">
            <form onSubmit={handleSubmit(values => this.submit(values))}>
              {this.stepComponent()}
              <div className="row">
                <div className="col s12">
                  <p className="red-text">{errors.main ? errors.main : ''}</p>
                  <Buttons step={ step }
                    onNext={() => this.nextStepCheck()}
                    onPrevious={() => goToStep( step - 1)}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerMecano, goToStep, registrationError }, dispatch);
}


function mapStateToProps(state) {
  const { mecano_registration } = state.form
  const { step, errors } = state.mecanoRegistration
  return {
    mobile: (mecano_registration && mecano_registration.values && (mecano_registration.values.mobile === "oui")),
    pro: (mecano_registration && mecano_registration.values && (mecano_registration.values.pro === "professionnel")),
    formData: mecano_registration,
    step,
    errors
  }
}

MecanoRegistration = reduxForm({
  form: 'mecano_registration'
})(connect(mapStateToProps, mapDispatchToProps)(MecanoRegistration));

export default MecanoRegistration;
