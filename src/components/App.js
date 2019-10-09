import React, {
  Component
} from 'react';
import Start from './Start';
import BattleShip from './BattleShip'
import './global';

class App extends Component {
  constructor(props) {
    // Пробрасываю пропсы в родителя.
    super(props);

    this.start = this.start.bind(this);
    this.state = {
      gameStep: 'gameOn',
    }
  }

  // Отрисовка компонентов.
  render() {
    if (this.state.gameStep === 'gameOn') {
      return <Start onClick = {
        this.start
      }
      />
    } else if (this.state.gameStep === 'fightOn') {
      return <BattleShip/>
    }
  }

  /** Передача компоненту начального состояния */
  start() {
    this.setState({
      gameStep: 'fightOn'
    })
  }

}

export default App;