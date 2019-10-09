import React from 'react'

/** Компонент формы ввода никнеймов */
class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validate: false,
    }
  }

  render() {
    return (
      <div id={this.props.blockId} className="input-block">
        <h3>{this.props.title}</h3>
        <div>
          <input id={this.props.inputId} type="text" placeholder="Name"></input>
          <span className='message'>{this.props.message}</span>
        </div>
      </div>
    )
  }

}

export default Form