import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { MecanoCard } from './index';
import { searchMecano } from '../../actions/index';
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
  }
  componentWillReceiveProps(nextProps){
    console.log("stopLoading", JSON.stringify(nextProps.mecano_search_results) !== JSON.stringify(this.props.mecano_search_results))
    console.log("startSearch", JSON.stringify(nextProps.mecano_search_params) !== JSON.stringify(this.props.mecano_search_params))
    if(JSON.stringify(nextProps.mecano_search_results)
    !== JSON.stringify(this.props.mecano_search_results)){
      this.setState({ loading: false });
    }
    if(JSON.stringify(nextProps.mecano_search_params)
    !== JSON.stringify(this.props.mecano_search_params)){
      this.props.searchMecano(this.props.mecano_search_params)
      this.setState({ loading: true });
    }
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
    const { distance } = this.props.mecano_search_params
    return (
      <div>
        <Header>Résultats de la recherche</Header>
        <div className="container">
          <div className="row">
            <div className="filters-group margin-top-20">
              <div className="input-field col s6 m6 l6">
                <select>
                  <option value="0" selected= {distance === 0} disabled= {distance === 0}>À domicile</option>
                  <option value="10" selected= {distance === 10} disabled= {distance === 10}>{'< 10km'}</option>
                  <option value="50" selected= {distance === 50} disabled= {distance === 50}>{'< 50km'}</option>
                </select>
                <label>Distance</label>
              </div>
              <div className="col s6 m6 l6">
                <Button icon="edit">Modifier la recherche</Button>
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
  return bindActionCreators({searchMecano}, dispatch);
}

function mapStateToProps({ search }) {
  const { results, distance, car_make, full_address, domains } = search
  return {
    mecano_search_results: results,
    mecano_search_params: {
      distance,
      vehicle: car_make,
      full_address,
      domains
    }
  }
}

MecanoSearchResults = connect(mapStateToProps, mapDispatchToProps)(MecanoSearchResults);

export { MecanoSearchResults };
