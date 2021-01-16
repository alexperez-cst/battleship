import React, { useState } from "react";
import AI from "./AI";
import Player from "./Player";
import Ship from "./Ship";
import Hitted from "./Hitted";
import Missed from "./missed";
import { Container, Row, Col } from "react-bootstrap";
function App() {
  const [started, setStarted] = useState(false);
  const [AIBoard, setAIBoard] = useState([]);
  const [PlayerBoard, setPlayerBoard] = useState([]);
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
        s[+y + +x * 10] = <Hitted />;
        return s;
      });
      return true;
    }
    await setPlayerBoard((s) => {
      s[+y + +x * 10] = <Missed />;
      return s;
    });
    return false;
  };
  return (
    <div id="app">
      <h1>Hello</h1>
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
    </div>
  );
}
export default App;
