import React from 'react';
import { Card } from 'antd';
import pipe from '../../pipe2.png';

const Pipe = ({ height, left, isBottom }) => {
  return (
    <Card
      bordered={false}
      style={{
        position: 'absolute',
        bottom: isBottom ? 'auto' : 0,
        top: isBottom ? 0 : 'auto',
        left: left,
        width: '120px',
        height: height,
        backgroundImage: `url(${pipe})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: isBottom ? 'rotate(180deg)' : 'none',
      }}
    />
  );
};

export default Pipe;

