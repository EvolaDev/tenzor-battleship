import React, { Component } from 'react';
import Square from './Button'

class Field extends Component {
  static HUMAN_USER = 'user';
  static PC_USER = 'pc'

  constructor(props) {
    super(props);
    
    this.pcScore = 0;
    this.playerScore = 0;
    this.handleClick = this.handleClick.bind(this);
  }
 
  getField() {
    let field = document.querySelector('.field-pc').getElementsByClassName('square'),
        arr = [],
        k = 0;

    for( let i = 0; i < 10; i++) {
      arr[i] = [];
      for( let j = 0; j < 10; j++) {
        arr[i][j] = field[k];
        k++;
      }
    }

    return arr;
  }

  checkWinner(pc, player) {  
    if(pc >= 20 || player == 20) { 
      this.props.message('Вы ' + ((pc == 20) ? 'проиграли' : 'победили'), 1);
    }
  }
    //TODO: Придумать оптимальный вариант c рекурсией или вынести в state
    checkShipIsDown(x, y, user) {  
    const shot = 'Попал';
    const down = 'Потопил';
    let gamer = user === Field.HUMAN_USER ?  global.gamer : global.pc;
    let lessX = x - 1;
    let lessY = y - 1;
    let largerX = +x + 1;
    let largerY = +y + 1;

    let message = '';
    if (!gamer[lessX] && !gamer[lessY]) {
      gamer[largerX][y] === 1 || gamer[x][largerY] === 1 
      ? message = shot 
      : message = down;
    } else if (!gamer[largerX] && !gamer[largerY]) {
      gamer[lessX][y] === 1 || gamer[x][largerY ] === 1 
      ? message = shot 
      : message = down;
    } else if (!gamer[largerX]) {
      gamer[lessX][y] === 1
      || gamer[x][largerY] === 1
      || gamer[x][lessY] === 1 
      ? message = shot
      : message = down;
    } else if (!gamer[lessX]) {
      gamer[largerX][y] === 1 
      || gamer[x][largerY] === 1
      || gamer[x][lessY] === 1 
      ? message = shot
      : message = down;
    } else if (!gamer[lessY]) {
      gamer[lessX][y] === 1
      || gamer[largerX][y] === 1 
      || gamer[x][largerY] === 1
      ? message = shot
      : message = down;
    } else if (!gamer[largerY]) {
      gamer[lessX][y] === 1
      || gamer[largerX][y] === 1 
      || gamer[x][lessY] === 1
      ? message = shot
      : message = down;
    } else {
      gamer[lessX][y] === 1
      || gamer[largerX][y] === 1
      || gamer[x][largerY] === 1 
      || gamer[x][lessY] === 1
      ? message = shot
      : message = down;
    }

    return message;
    }

  /** Отработка шага компьютера */
  computerStep() {
    setTimeout(()=>{
      let field = this.getField(),
      x = getRandom(9),
      y = getRandom(9);  

    switch(global.gamer[x][y]) {
        case 0:
          global.gamer[x][y] = 2;
          field[x][y].classList.add('square-miss');
          this.props.message('Промах');
          this.props.stepOwner(global.name || 'Вы')
          break;
        case 1:
          global.gamer[x][y] = 3;
          field[x][y].classList.add('square-strike');
          this.props.message(this.checkShipIsDown(x, y, Field.HUMAN_USER));
          this.pcScore++;
          this.computerStep();
          this.checkWinner(this.pcScore, this.playerScore);
          break;
        case 2:
          this.computerStep(); 
          break;
        case 3:
          this.computerStep(); 
          break;

        default: 
          console.log('Ошибка при заполнение массива');
      }
    }, 900);
    
  }

  /** Обработчик выстрела игрока */
  handleClick(e) {
    let x = e.target.getAttribute('data-x'),
        y = e.target.getAttribute('data-y');

    switch(global.pc[x][y]) {
      case 0:
        global.pc[x][y] = 2;
        e.target.classList.add('square-miss');
        this.props.message('Промах');
        this.props.stepOwner(global.namePC || 'PC');
        this.computerStep();
        break;
      case 1:
        global.pc[x][y] = 3;
        e.target.classList.add('square-strike');
        this.props.message(this.checkShipIsDown(x, y, Field.PC_USER));
        this.playerScore++;
        this.checkWinner(this.pcScore, this.playerScore);
        break;
      case 2: 
        break;
      case 3: 
        break;
      default: 
        console.log('Ошибка при заполнение массива');
    }
  }

  mapForAttack(arr, memory) {
    arr = [];
    for(let i = 0; i < 10; i++) {
      arr[i] = [];
      for(let j = 0; j < 10; j++) {
        arr[i][j] = 
        <Square 
          className="square" 
          onClick={this.handleClick} 
          key={i + '' + j} 
          x={i} y={j}   
        />;
      }
    }  
    return arr;
  }

  renderMapFromArray(arr, memory) {
    arr = []
    for(let i = 0; i < 10; i++) {
      arr[i] = []
      for(let j = 0; j < 10; j++) {
        if(memory[i][j] == 1) {
          arr[i][j] = 
          <Square 
            className="square square-with-ship" 
            click={false} 
            key={i + '' + j}
            x={i} y={j}  
          />
        } else if(memory[i][j] == 3) {
          arr[i][j] = 
          <Square 
            className="square square-with-ship square-strike" 
            click={false} 
            key={i + '' + j}
            x={i} y={j}  
          />
        } else {
          arr[i][j] = 
            <Square
              className="square"
              click={false}
              key={i + '' + j}
              x={i} y={j}  
            />
        }
      }
    }
    return arr;
  }

  /** Отрисовка поля */
  render() {
    return (
      <div className='map'>
        <h3>{this.props.title || 'Player'}</h3>
        <div className={'field ' + (this.props.computer ? 'field-pc' : 'field-hum')}>
          {this.props.status === 'show' ? this.renderMapFromArray(this.temp, global.gamer) : null}
          {this.props.status === 'attack' ? this.mapForAttack(this.temp, global.pc) : null}
        </div> 
      </div>
    );
  }
}

/** Случайное число дял выстрела и расстановки */
function getRandom(max) {
  return Math.floor(Math.random() * (max + 1));
}

export default Field;