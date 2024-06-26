import React from 'react';
import { Modal, Button } from 'antd';

const GameOver = ({ visible, onRetry }) => {
  return (
    <Modal visible={visible} footer={null} closable={false}>
      <h2>Game Over</h2>
      <Button type="primary" onClick={onRetry}>Retry</Button>
    </Modal>
  );
};

export default GameOver;
