import React, { Component } from 'react'
import Counter from './Counter';
import Counter1 from './Counter1';

export default class Increment extends Component {

    constructor(){
        super();
        this.state ={
            count:0
        }

    }

    componentDidMount(){
        console.log("component Did Mount First Render");
    }
    increment(){
        this.setState({count: this.state.count +1});
    }
    componentWillUnmount(){
        console.log("Component has unmounted");
    }
    
  render() {
    return (
      <div>
        
     {/* /   <Counter number={this.state.count}> </Counter> */}
        <Counter1 number={this.state.count}> </Counter1>
        <button onClick={ () => {this.increment() }}> Click </button>
        </div>
    )
  }
}
