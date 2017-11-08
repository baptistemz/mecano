import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, stopSubmit } from 'redux-form';
import PictureUpdate from '../PictureUpdate';
import { updateMecanoProfile, mecanoRegistrationError } from '../../actions/index';
import { Header, Loader, RadioButtons, Input } from '../../common/index';
import { injectIntl } from 'react-intl';
import { googleMapsAutocomplete, formatRegistrationData } from '../../utils/mecanoRegistrationUtils'
import { defaultMessages } from '../../../libs/i18n/default';

class MecanoEdit extends Component {
  constructor(props){
    super(props);
    this.state = { loading: !props.mecano_edit };
  }
  componentDidMount(){
    //SET GOOGLE-PLACE-AUTOCOMPLETE ON THE ADDRESS FIELD
    var input = document.getElementById('icon_full_address');
    var options = { componentRestrictions: {country: ['fr', 'be', 'ch']} };
    googleMapsAutocomplete(input, options, this.props.dispatch, "mecano_edit", "full_address")
  }
  componentDidUpdate(previousProps){
    if((this.props.mecano_edit && !previousProps.mecano_edit) || (this.props.errors !== previousProps.errors)){
      this.setState({loading: false})
    }
  }
  submit(values){
    this.setState({ loading: true });
    values = formatRegistrationData(values, this.props.mobile, this.props.pro)
    this.props.updateMecanoProfile(this.props.mecano_id, values, '/mecano_profile')
  }
  render(){
    const { handleSubmit, errors, pro, mobile } = this.props;
    const { formatMessage } = this.props.intl
    return (
      <div>
        <Header>{formatMessage(defaultMessages.headersMecanoProfileEdit)}</Header>
        <div className="container">
          {
            this.state.loading ?
              <Loader background={true} />
            :
              <div></div>
          }
          <form onSubmit={handleSubmit(values => this.submit(values))}>
            <div className="col s12 l6 text-center">
              <br/>
              <h2>{formatMessage(defaultMessages.mecanoRegistrationMyProfile)}</h2>
              <PictureUpdate/>
              <RadioButtons name="pro" label={formatMessage(defaultMessages.mecanoRegistrationIAmA)} options={{ "pro": formatMessage(defaultMessages.mecanoPro), "non_pro":formatMessage(defaultMessages.mecanoNonPro) }} />
              {
                pro === "pro" ?
                <div className="row">
                  <div className="col s9">
                    <Input icon="monetization_on" name="price" label={formatMessage(defaultMessages.mecanoPrice)} type="number" error={errors.price} />
                    <Input icon="business" name="company_name" label={formatMessage(defaultMessages.mecanoCompanyName)} type="text" error={errors.company_name} />
                  </div>
                  <p className="col s3" style={{ fontSize: 17, marginTop: 24}}>€/heure</p>
                </div>
                :
                ''
              }
            </div>
            <div className="col s12 l6 text-center">
              <br/>
              <h2>{formatMessage(defaultMessages.mecanoRegistrationGeographicData)}</h2>
              <Input icon="explore" name="full_address" label={formatMessage(defaultMessages.mecanoFullAddress)} type="text" error={errors.address || errors.city || errors.country} />
              <RadioButtons label={formatMessage(defaultMessages.mecanoRegistrationIAmMobile)} name="mobile" options={{"mobile": formatMessage(defaultMessages.yesWord), "non_mobile": formatMessage(defaultMessages.noWord)}} />
              {
                mobile === "mobile" ?
                <div className="row">
                  <div className="col s9">
                    <Input icon="explore" name="radius" label={formatMessage(defaultMessages.mecanoRadius)} type="number" error={errors.radius} />
                  </div>
                  <p className="col s3" style={{ fontSize: 17, marginTop: 24}}>km</p>
                </div>
                :
                ''
              }
            </div>
            <div className="col s12">
              <p className="red-text">{errors ? errors['main'] : ''}</p>
              <div className="space-between">
                <div></div>
                <a onClick={handleSubmit(values => this.submit(values))} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">keyboard_arrow_right</i></a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateMecanoProfile, mecanoRegistrationError }, dispatch);
}


function mapStateToProps(state) {
  const { mecano_edit } = state.form
  const { mobile, pro, id, radius, full_address, price, company_name, errors } = state.mecano
  return {
    mobile: mecano_edit ? mecano_edit.values.mobile : mobile,
    pro: mecano_edit ? mecano_edit.values.pro : pro,
    mecano_id: id,
    mecano_edit,
    initialValues: { pro, mobile, radius, full_address, price, company_name },
    errors : errors
  }
}

MecanoEdit = reduxForm({
  form: 'mecano_edit'
})(MecanoEdit);

MecanoEdit = injectIntl(connect(mapStateToProps, mapDispatchToProps)(MecanoEdit))

export { MecanoEdit };
