import React from 'react';

const ProfilePicture = ({ src, small }) => {
  const style = small ? {width: '60px', height: '60px'} : {};
  return (
    <img className="avatar-circle" style={style} src={src} alt="profile_picture"/>
  );
};

export { ProfilePicture };
