import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProfile } from '../actions/index';
import { Button } from '../common/index';
import getBase64 from '../utils/getBase64'

class PictureUpload extends Component{
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => this.props.updateProfile({ profile_picture: reader.result })
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  render(){
    const imgSrc = this.props.profilePicture || "/thumb/default_profile.png"
    return (
      <div>
        <img src={imgSrc} />
        <input className="fileInput"
          type="file"
          onChange={(e)=>this.handleImageChange(e)} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateProfile }, dispatch);
}

function mapStateToProps({ auth }) {
  return { profilePicture: auth.user.profile_picture.thumb.url }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureUpload);
