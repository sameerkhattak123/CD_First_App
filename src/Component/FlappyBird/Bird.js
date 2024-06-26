import React from 'react';
import bird from '../../bird.png';

const Bird = ({ position }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: position,
        left: '50px',
        width: '34px',
        height: '24px',
        backgroundImage: `url(${bird})`, // Correct way to use the image path
        backgroundSize: 'cover',
      }}
    />
  );
};

export default Bird;
