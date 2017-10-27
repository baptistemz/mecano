import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Rater from 'react-rater';
import { loadReviews } from '../actions/index';


class ReviewList extends Component{
  render(){
    const { id, reviews, title, expandable, loadMessage, loadReviews } = this.props;
    return(
      <ul className="collection with-header">
        <li className="collection-header">
          <h5 className="capitalize no-margin">{title}</h5>
        </li>
        {reviews.map((review)=>{
          return(
            <li key={review.id} className="collection-item avatar">
              <img src={review.user.picture.url} alt="" className="circle" />
              <h6>{review.user.display_name} <Rater rating={review.mark} interactive={false} /></h6>
              <p>{review.comment}</p>
            </li>
          )
        })}
        {expandable ?
          <li onClick={()=> loadReviews(id, reviews.length + 5)}
            className="collection-item load-message">
            <p className='no-margin'>{loadMessage.toUpperCase()}</p>
          </li>
          :
          <div></div>
        }
      </ul>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadReviews }, dispatch);
}


ReviewList = connect(null, mapDispatchToProps)(ReviewList);

export { ReviewList};
