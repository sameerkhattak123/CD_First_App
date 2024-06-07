import React, { Component } from 'react'

export default class Counter extends Component {
    
    componentDidUpdate(prevprops,prevState){
        if(prevprops.number!== this.props.number){
            console.log("Componented Updated")
        }

    }

  render() {
    return (
      <div>
        <h1> Increment: {this.props.number}</h1>
        </div>
    )
  }
}
