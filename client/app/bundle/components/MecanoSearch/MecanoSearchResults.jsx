import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {Link} from 'react-router-dom';
import { MecanoCard } from './index';
import { searchMecano, updateDistance } from '../../actions/index';
import { Header, Loader, Button } from '../../common/index';

class MecanoSearchResults extends Component {
  constructor(){
    super()
    this.state = { loading : true }
  }
  componentWillMount(){
    this.props.searchMecano(this.props.mecano_search_params)
    this.setState({ loading: true });
  }
  componentDidMount(){
    this.setState({ loading: false });
    $('select').material_select();
    const onDistanceChange = (event) => this.onDistanceChange(event);
    $('select').on('change', function(e) {
      onDistanceChange(e);
    });
  }
  componentWillReceiveProps(nextProps){
    console.log("stopLoading", JSON.stringify(nextProps.mecano_search_results) !== JSON.stringify(this.props.mecano_search_results))
    console.log("startSearch", JSON.stringify(nextProps.mecano_search_params) !== JSON.stringify(this.props.mecano_search_params))
    this.setState({ loading: false });
    if(JSON.stringify(nextProps.mecano_search_params)
    !== JSON.stringify(this.props.mecano_search_params)){
      // TRIGGERED IF SEARCH PARAMS HAVE CHANGeD
      console.log("ANOTHER SEARCH STARTING")
      this.props.searchMecano(nextProps.mecano_search_params)
      this.setState({ loading: true });
    }
  }

  onDistanceChange(event){
    this.props.updateDistance(event.target.value)
  }

  searchResults(){
    const { mecano_search_results } = this.props;
    console.log(mecano_search_results)
    if(this.state.loading){
      return <Loader />
    }
    return(
      <div>
        {mecano_search_results.map((mecano) =>{
          const { id, distance, display_name, city, pro, mobile, price, picture } = mecano
          return <MecanoCard key={id} id={id} title={ display_name } pro={ pro } imgSrc={ picture.thumb.url } mobile={ mobile } price={ price } rating={4.33} raters={13} distance={distance} />
        })}
      </div>
    )
  }
  render(){
    const { distance, full_address, domains, vehicle } = this.props.mecano_search_params
    return (
      <div>
        <Header>Résultats de la recherche</Header>
        <div className="container">
          <div className="row">
            <div className="filters-group margin-top-20">
              <div className="input-field col s4 offset-m2 m4 l6">
                <select defaultValue={distance} onChange={(e) => {this.onDistanceChange(e)}}>
                  <option value="0">À domicile</option>
                  <option value="10">{'< 10km'}</option>
                  <option value="50">{'< 50km'}</option>
                </select>
                <label>Distance</label>
              </div>
              <div className="col s8 m6 m4 l6">
                <div id="search-data-recap" className= "space-between flex-end">
                  <div>
                    <p id="domain-list">{domains.join(', ')}</p>
                    <p>{full_address.split(",").slice(full_address.split(",").length - 2)}</p>
                    <p>{`${vehicle.brand}, ${vehicle.model}`}</p>
                  </div>
                  <Link to={"/mecano_search"}>
                    <Button icon="edit" />
                  </Link>
                </div>
              </div>
            </div>

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
  const { results, distance, vehicle, full_address, domains } = search
  return {
    mecano_search_results: results,
    mecano_search_params: {
      distance,
      vehicle,
      full_address,
      domains
    }
  }
}

MecanoSearchResults = connect(mapStateToProps, mapDispatchToProps)(MecanoSearchResults);

export { MecanoSearchResults };
