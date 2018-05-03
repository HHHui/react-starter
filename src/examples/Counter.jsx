import React, { Component } from "react";
import { connect } from "react-redux";
import { addCounter } from "../actions/counter";

@connect(mapStateToProps, { addCounter })
class Counter extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>{this.props.value}</h1>
        <button onClick={() => this.props.addCounter(1)}>+</button>
        <button onClick={() => this.props.addCounter(-1)}>-</button>
      </div>
    );
  }
}

function mapStateToProps({ counter }) {
  return {
    value: counter.value
  };
}

export default Counter;
