import React, { Component } from "react";

class ClickButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("Button clicked!", this);
  }

  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}

export default ClickButton;
