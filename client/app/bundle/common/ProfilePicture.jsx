import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfilePicture extends Component {
  render(){
    const { profile_picture, imgSrc, currentUser } = this.props
    const style = this.props.small ? {width: '60px', height: '60px'} : {};
    if(currentUser){
      const imgSrc = profile_picture
    }
    return (
      <img className="avatar-circle" style={style} src={imgSrc || "/thumb/default_profile.png"} alt="profile picture"/>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile_picture: state.auth.profile_picture.thumb.url
  }
}

ProfilePicture =connect(mapStateToProps, null)(ProfilePicture)

export { ProfilePicture };
