import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchRecommendationPictures } from '../actions/index';
import { RecommendationPictures, Loader } from './index';

class DomainListItem extends Component {
  constructor(){
    super()
    this.state = { onHover: false, loadingPictures: true }
  }
  loadPictures(){
    const { id, fetchRecommendationPictures } = this.props;
    this.setState({ onHover: true, loadingPictures:true })
    fetchRecommendationPictures(id)
  }
  componentWillReceiveProps(){
    this.setState({ loadingPictures: false })
  }
  recommendButton(id, recommended){
    if(recommended){
      return <a onClick={() => this.props.unrecommend(id)} className="secondary-content recommend-btn red-btn">-1</a>
    }else{
      return <a onClick={() => this.props.recommend(id)} className="secondary-content recommend-btn green-btn">+1</a>
    }
  }

  render(){
    const { id, recommended, recommendationNumber, text, isAuthenticated, pictures, recommendBtn } = this.props
    return(
      <li className="collection-item">
        <div className="capitalize">{text}</div>
        {isAuthenticated && recommendBtn ?
          this.recommendButton(id, recommended)
          :
          <a></a>
        }
        <a onMouseOver={() => this.loadPictures()}
          onMouseOut={() => this.setState({ onHover: false })}
          className="secondary-content recommendation-chip">
          {recommendationNumber}
        </a>
        {this.state.onHover ?
          this.state.loadingPictures ?
            (
              <div className="secondary-content recommendation-pictures-group"></div>
            )
          :
            <div className="secondary-content recommendation-pictures-group"><RecommendationPictures pictures={pictures} /></div>
        :
          <div></div>
        }
      </li>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRecommendationPictures }, dispatch);
}

function mapStateToProps({ mecano_visited }) {
  return {
    pictures: mecano_visited.recommendation_pictures
  }
}

DomainListItem = connect(mapStateToProps, mapDispatchToProps)(DomainListItem)

export { DomainListItem };
