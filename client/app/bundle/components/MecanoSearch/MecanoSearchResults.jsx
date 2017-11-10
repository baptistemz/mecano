import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { MecanoCard } from './index';
import { searchMecano, updateDistance } from '../../actions/index';
import { Header, Loader, Button } from '../../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

class MecanoSearchResults extends Component {
  constructor(props){
    super(props)
    axios.defaults.headers.common["app_key"] = props.appKey;
    const search = () => {
      props.searchMecano(props.mecano_search_params)
    }
    search()
    this.state = { loading : true }
  }
  componentDidMount(){
    $('select').material_select();
    const onDistanceChange = (event) => this.onDistanceChange(event);
    $('select').on('change', function(e) {
      onDistanceChange(e);
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({ loading: false });
    axios.defaults.headers.common["app_key"] = this.props.appKey;
    if(JSON.stringify(nextProps.mecano_search_params)
    !== JSON.stringify(this.props.mecano_search_params)){
      if(nextProps.mecano_search_params.car_make){
        // TRIGGERED IF SEARCH PARAMS HAVE CHANGeD
        this.props.searchMecano(nextProps.mecano_search_params);
        this.setState({ loading: true });
      }
    }
  }

  onDistanceChange(event){
    this.props.updateDistance(event.target.value)
  }

  searchResults(){
    const { formatMessage } = this.props.intl;
    const { mecano_search_results } = this.props;
    if(this.state.loading){
      return(
        <div className="search-loader-center">
          <Loader />
        </div>
      )
    }
    if(mecano_search_results.length === 0){
      return(
        <div className= "col s12 offset-m2 m8 l12 no-mecano-results">
          <div className="left-arrow">
            <i className="material-icons">redo</i>
          </div>
          <div className="right-arrow">
            <i className="material-icons">undo</i>
          </div>
          <h5 className="text-center">{formatMessage(defaultMessages.mecanoSearchNoMecanoFound)}</h5>
          <div className="col s5">
            <p>{formatMessage(defaultMessages.mecanoSearchChangeSearchRadius)}</p>
          </div>
          <div style={{marginTop: '16px'}} className="col s2">{formatMessage(defaultMessages.or).toUpperCase()}</div>
          <div className="col s5">
            <p>{formatMessage(defaultMessages.mecanoSearchChangeSearchParams)}</p>
          </div>
        </div>
      )
    }
    return(
      <div>
        {mecano_search_results.map((mecano) =>{
          const { id, distance, display_name, city, country, pro, mobile, price, picture, rating } = mecano
          return <MecanoCard key={id} id={id} title={display_name} city={city} country={country} pro={pro} imgSrc={picture.thumb.url} mobile={mobile} price={price} rating={rating} raters={13} distance={distance} />
        })}
      </div>
    )
  }
  render(){
    const { distance, full_address, domains, vehicle } = this.props.mecano_search_params;
    const { formatMessage } = this.props.intl;
    const domain_list = domains.map((domain) =>{
      let key = _.camelCase('mecano_technical_skills_' + domain)
      return formatMessage(defaultMessages[key])
    })
    return (
      <div className="boxes-background">
        <Header>{formatMessage(defaultMessages.headersSearchResults)}</Header>
        <div className="filters-group">
          <div className="container">
            <div className="row">
              <div className="input-field col s4 offset-m2 m4 l6">
                <select defaultValue={distance} onChange={(e) => {this.onDistanceChange(e)}}>
                  <option value="0">{formatMessage(defaultMessages.mecanoSearchAtHome)}</option>
                  <option value="10">{'< 10km'}</option>
                  <option value="50">{'< 50km'}</option>
                </select>
                <label>{formatMessage(defaultMessages.mecanoSearchDistance)}</label>
              </div>
              <div className="col s8 m4 l6">
                <div className= "space-between flex-end">
                  <div style={{maxWidth: 'calc(100% - 86px)'}}>
                    <p id="domain-list" className="capitalize">{domain_list.join(', ')}</p>
                    <p>{`${vehicle.brand}, ${vehicle.model}`}</p>
                    <p>{full_address.split(",").slice(full_address.split(",").length - 2)}</p>
                  </div>
                  <Link to={"/mecano_search"}>
                    <Button icon="edit" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {this.searchResults()}
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({searchMecano, updateDistance}, dispatch);
}

function mapStateToProps({ search }) {
  const { results, distance, vehicle, full_address, domains, car_make } = search;
  return {
    mecano_search_results: results,
    mecano_search_params: {
      car_make,
      distance,
      vehicle,
      full_address,
      domains
    }
  }
}

MecanoSearchResults = injectIntl(connect(mapStateToProps, mapDispatchToProps)(MecanoSearchResults));

export { MecanoSearchResults };
