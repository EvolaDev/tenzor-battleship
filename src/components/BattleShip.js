import React from 'react'
import Field from './Field'

class BattleShip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'Первый ход'
    }
    this.stepOwner = this.stepOwner.bind(this);
    this.changeMessgae = this.changeMessgae.bind(this);
  }

  stepOwner(msg) {
    this.setState({
      step: msg,
    });
  }

  reload() {
    window.location.reload();
  }
    /** Сообщение результатов хода */
    changeMessgae(msg, gameFinish) {
    this.setState({
      message: msg,
    });

    if(gameFinish) {
      document.querySelector('.modal').classList.add('modal--show');
    } 
  }

  render() {
    return ( 
      <div className="container">
        <h1 className="title title-main">Бой {global.namePC} VS {global.name}</h1>
        <div className="row" style={{marginBottom: 50 + 'px', width: 900 + 'px', justifyContent: 'space-between'}}>
          <Field
            title= {global.namePC}  
            status='show'
            click= {false}
            computer={true} 
          />
          <div className="info">
            <h3>{this.state.message}</h3>
            <h4>{this.state.step}, ваш ход!</h4>
          </div>
          <Field 
            title= {global.name}  
            status='attack'
            message={this.changeMessgae}
            stepOwner={this.stepOwner}
          />
        </div>
        <div className='modal '>
          <h2 className='modal__header'>{this.state.message}</h2>
          <button className="btn btn-start" onClick={ this.reload }>Начать заново</button>
        </div>
      </div>
    )
  }
}

export default BattleShip