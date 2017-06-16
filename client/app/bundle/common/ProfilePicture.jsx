import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfilePicture extends Component {
  render(){
    const style = this.props.small ? {width: '60px', height: '60px'} : {};
    const imgSrc = this.props.profile_picture || "/thumb/default_profile.png"
    return (
      <img className="avatar-circle" style={style} src={imgSrc} alt="profile picture"/>
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
