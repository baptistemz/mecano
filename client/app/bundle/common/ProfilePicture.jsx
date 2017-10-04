import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfilePicture extends Component {
  render(){
    const { profile_picture, imgSrc, currentUser } = this.props
    const style = this.props.small ? {maxWidth: '60px', maxHeight: '60px', minWidth: '60px', minHeight: '60px'} : {maxWidth: '100px', maxHeight: '100px', minWidth: '100px', minHeight: '100px'};
    const src = currentUser ? profile_picture : imgSrc
    return (
      <img className="avatar-circle" style={style} src={src || "/thumb/default_profile.png"} alt="profile picture"/>
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
