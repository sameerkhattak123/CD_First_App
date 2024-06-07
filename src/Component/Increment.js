import React, { Component } from 'react';
import Counter1 from './Counter1';
import { Button } from 'antd';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column', // Stack child elements vertically
  justifyContent: 'center',
  alignItems: 'center',
  height: '20vh', // Adjust as needed
};

const buttonStyle = {
  marginTop: '20px', // Adjust margin as needed
};

export default class Increment extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    console.log("component Did Mount First Render");
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  componentWillUnmount() {
    console.log("Component has unmounted");
  }

  render() {
    return (
      <div style={containerStyle}>
        <Counter1 number={this.state.count} />
        <Button type="primary" style={buttonStyle} onClick={this.increment}>Click</Button>
      </div>
    );
  }
}
