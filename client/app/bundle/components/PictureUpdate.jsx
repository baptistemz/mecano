import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProfile } from '../actions/index';
import { Button, Loader } from '../common/index';
import getBase64 from '../utils/getBase64'

class PictureUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = { loadingImage: false }
  }
  componentWillReceiveProps(nextprops){
    const loadingImage = !nextprops.profilePicture
    this.setState({ loadingImage })
  }
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({ loadingImage: true });
      this.props.updateProfile({ profile_picture: reader.result });
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  render(){
    const imgSrc = this.props.profilePicture || "/thumb/default_profile.png"
    const img = this.state.loadingImage ? <Loader/> : <img src={imgSrc} />
    return (
      <div>
        <div className="thumb-image-container">
          {img}
        </div>
        <input className="fileInput"
          type="file"
          onChange={(e)=>this.handleImageChange(e)} />
      </div>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateProfile }, dispatch);
}

function mapStateToProps({ auth }) {
  return { profilePicture: auth.profile_picture.thumb.url }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureUpdate);
