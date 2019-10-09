import React, {Component} from 'react'

class Button extends Component {
  constructor(props) {
    super(props);

    this.squareClick = this.props.click ? this.squareClick.bind(this) : null;
  }
 
  render() {
    return (
      <button 
            onClick={this.props.onClick} 
            className={this.props.className} 
            data-x={this.props.x} 
            data-y={this.props.y}
      ></button>
    )
  }
}

export default Button; 
