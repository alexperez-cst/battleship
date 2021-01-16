import React, { useState, useEffect } from "react";
import AI from "./AI";
import Player from "./Player";
import Ship from "./Ship";
import Hitted from "./Hitted";
import Missed from "./missed";
import { Container, Row, Jumbotron, Button} from "react-bootstrap";
function App() {
  const [started, setStarted] = useState(false);
  const [AIBoard, setAIBoard] = useState([]);
  const [PlayerBoard, setPlayerBoard] = useState([]);
  const [winner, setWinner] = useState('');
  const [x, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const checkBoards = () => {
    try{
      const aiBoard = [...document.querySelector('#AiGameboard').children];
      console.log(aiBoard);
      const playerBoard = [...document.querySelector('#gameboard').children];
      let actualWinner = null;
      for(let i=0;i<100;i++){
        if(aiBoard[i].classList.contains('.')){
          actualWinner = 'ai';
          break;
        }
        actualWinner = 'player';
      }
      for(let i=0;i<100;i++){
        if(playerBoard[i].classList.contains('ship')){
          if(actualWinner === 'ai') actualWinner = null;
          break;
        }
      }
      return actualWinner;
    }catch(err){
      return null;
    }
  }
  const sendAttack = async (x, y) => {
    const gameboard = document.getElementById("gameboard");
    const xGrid = [...gameboard.querySelectorAll(`[data-x="${x}"]`)];
    const yGrid = xGrid.reduce((tot, x) => {
      console.log(x.getAttribute("data-y"), `${y}`);
      tot = x.getAttribute("data-y") === `${y}` ? x : tot;
      return tot;
    }, "");
    if (yGrid.classList.contains("ship")) {
      await setPlayerBoard((s) => {
        s[+y + +x * 10] = <Hitted x={x} y={y}/>;
        return s;
      });
    }else{
      await setPlayerBoard((s) => {
        s[+y + +x * 10] = <Missed x={x} y={y}/>;
        return s;
      });
    }
    forceUpdate();
  };
  useEffect(() => {
    console.log('checking');
    const actWinner = checkBoards();
    console.log(actWinner)
    switch(actWinner){
      case null:{
          break;
      }
      default:{
        setWinner(actWinner)
      }
    }
  },[x])
  return (
    <div id="app">
      {winner === '' 
      ? (<div>
          <h1 id='title'>Battleship</h1>
          <Container>
            <Row>
              <Player
                board={PlayerBoard}
                setBoard={setPlayerBoard}
                setStart={setStarted}
              />
            </Row>
            <Ship index={5} />
            <br />
            <Ship index={4} />
            <br />
            <Ship index={3} />
            <br />
            <Ship index={2} />
            <br />
          </Container>
          {started ? (
            <Container>
              <Row>
                <AI board={AIBoard} setBoard={setAIBoard} sendAttack={sendAttack} />
              </Row>
            </Container>
          ) : null}
        </div>)
        :(<Jumbotron>
            <br/>
            <h1>Congratulations {winner}, You Win!</h1>
          </Jumbotron>)
      }
    </div>
  );
}
export default App;
