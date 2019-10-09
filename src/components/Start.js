import React, {Component} from 'react';
import Form from './Form';

/** Компонент начального окна игры */
class Start extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.inputValidate = this.inputValidate.bind(this);
  }
  
  /** Обработчик нажатия кнопки начала игры */
  handleClick(e) {
    let inputBlock = document.getElementById('input-name');
    let inputNext = document.getElementById('input-next');
    let inputPC = document.getElementById('input-pc');
    let inputToGame = document.getElementById('input-to-game');
 
    inputNext.focus();
    inputBlock.classList.add('input-block--show');
    e.target.classList.add('hidden');
    inputNext.addEventListener("keyup", (e) => {
      e.preventDefault();
      if(e.keyCode === 13) {
        global.name = e.target.value;
        inputBlock.classList.add('hidden');
        inputPC.classList.add('input-block--show');
        inputToGame.focus();
      }
    });
    inputToGame.addEventListener("keyup", (e) => {
      e.preventDefault()
      if(e.keyCode === 13) {
        global.namePC = e.target.value;
        inputPC.classList.add('hidden');
        this.props.onClick();
      }
    });
  }

  inputValidate(msg) {
    return !!msg === '' || !isNaN(msg);
  }

  render() {
    return (
      <div className="container">
        <h1 className="title title-prev">Морской бой</h1>
        <button className="btn btn-start" onClick={this.handleClick}>Начать бой</button>
        <Form 
          title="Введите свое имя"
          blockId="input-name"
          inputId="input-next"
          message={this.message}
        />
        <Form 
          title="Введите имя компьютера"
          blockId="input-pc"
          inputId="input-to-game"
        />
      </div>
    );
  }
}

export default Start;
