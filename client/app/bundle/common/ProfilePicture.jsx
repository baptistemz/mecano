import React from 'react';

const ProfilePicture = ({src}) => {
  return (
    <img className="avatar-circle" src={src} alt="profile_picture"/>
  );
};

export { ProfilePicture };
