import React, { useState } from "react";
import Gameboard from "./Gameboard";
import Missed from "./missed";
import Hitted from "./Hitted";
import { Container } from "react-bootstrap";
const AI = (props) => {
  const random = ~~(Math.random() * 10);
  const attacked = (x, y) => {
    return hitted[y].includes(x);
  };
  function* aggresiveAttack(x, y) {
    let xAxis = x;
    let yAxis = y;
    for (let i = 0; i < 2; i++) {
      for (let x = 1; x <= 2; x++) {
        xAxis = x % 2 === 0 ? x + 2 : x - 1;
        if (attacked(xAxis, yAxis)) continue;
        yield [xAxis, yAxis];
      }
      xAxis--;
      for (let y = 1; y <= 2; y++) {
        yAxis = y % 2 === 0 ? x + 1 : x - 2;
        if (attacked(xAxis, yAxis)) continue;
        yield [xAxis, yAxis];
      }
    }
  }
  const nextRound = () => {
    const xAxis = random();
    const yAxis = random();
    if (attacked(xAxis, yAxis)) {
      return nextRound();
    }
    setHitted((s) => {
      s[yAxis] ? s[yAxis].push(xAxis) : (s[yAxis] = [xAxis]);
      return s;
    });
    if (props.sendAttack(xAxis, yAxis)) {
      setAttackMode(() => {
        for (const attack of aggresiveAttack.bind(null, xAxis, yAxis)) {
          if (props.sendAttack(...attack)) {
            continue;
          }
          setAttackMode(nextRound);
          break;
        }
      });
    }
  };
  const [attackMode, setAttackMode] = useState(nextRound);
  const [hitted, setHitted] = useState({});
  const recieveAttack = (e) => {
    const yAxis = e.target.getAttribute("y");
    const xAxis = e.target.parentNode.getAttribute("x");
    const xyAxis = xAxis + yAxis;
    if (props.board[xyAxis].children.length) {
      return;
    }
    if (!props.board[xyAxis]) {
      props.setBoard((s) => (s[xyAxis] = <Missed />));
      attackMode();
      return;
    }
    const shipIndex = props.board[xyAxis].index;
    props.board[xyAxis].ship.hit(shipIndex);
    props.setBoard((s) => (s[xyAxis] = <Hitted />));
  };
  return (
    <Container>
      <Gameboard click={recieveAttack} />
    </Container>
  );
};
