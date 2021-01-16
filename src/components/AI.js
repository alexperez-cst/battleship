import React, { useState, useEffect } from "react";
import Gameboard from "./Gameboard";
import Missed from "./missed";
import Hitted from "./Hitted";
import { Container } from "react-bootstrap";
const AI = (props) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const random = (max) => ~~(Math.random() * max);
  const attacked = (x, y, filtering,board) => {
    const gameboard = document.getElementById(board);
    const xGrid = [...gameboard.querySelectorAll(`[data-x="${x}"]`)];
    const yGrid = xGrid.reduce((tot, x) => {
      console.log(x.getAttribute("data-y"), `${y}`);
      tot = x.getAttribute("data-y") === `${y}` ? x : tot;
      return tot;
    }, "");
    console.log(xGrid, yGrid);
    console.log(yGrid.classList);
    return yGrid.classList.contains(filtering) ? true : false;
  };
  /*
  function* aggresiveAttack(xCord, yCord) {
    let xAxis = xCord;
    let yAxis = yCord;
    for (let i = 0; i < 2; i++) {
      for (let x = 1; x <= 2; x++) {
        xAxis = x % 2 === 0 ? xAxis + 2 : xAxis - 1;
        if (xAxis >= 10 || xAxis < 0) {
          continue;
        }
        console.log(xAxis, yAxis);
        if (attacked(xAxis, yAxis, "hit")) continue;
        yield [xAxis, yAxis];
      }
      xAxis--;
      for (let y = 1; y <= 2; y++) {
        yAxis = y % 2 === 0 ? yAxis + 2 : yAxis - 1;
        if (yAxis >= 10 || yAxis < 0) {
          continue;
        }
        console.log(xAxis, yAxis);
        if (attacked(xAxis, yAxis, "hit")) continue;
        yield [xAxis, yAxis];
      }
    }
  }
  */
  const nextRound = () => {
    console.log("In Next Round");
    const xAxis = random(10);
    const yAxis = random(10);
    if (attacked(xAxis, yAxis, "hit",'gameboard')) {
      return nextRound();
    }
    props.sendAttack(xAxis,yAxis)
    /*if (props.sendAttack(xAxis, yAxis)) {
      await setnextRound(async () => {
        for (const attack of aggresiveAttack(xAxis, yAxis)) {
          if (props.sendAttack(...attack)) {
            continue;
          }
          await setnextRound(() => nextRound);
          break;
        }
      });
    }*/
  };
  const randomShips = (maxSize, minSize) => {
    if (maxSize === minSize) {
      return;
    }
    let randomX = random(10);
    const randomY = random(10);
    if (randomX + maxSize <= 10) {
      const gameboard = document.getElementById("AiGameboard");
      for (let i = 0; i < maxSize; i++) {
        const xGrid = [...gameboard.querySelectorAll(`[data-x="${randomX}"]`)];
        const yGrid = xGrid.reduce((tot, x) => {
          console.log(x.getAttribute("data-y"), `${randomY}`);
          tot = x.getAttribute("data-y") === `${randomY}` ? x : tot;
          return tot;
        }, "");
        console.log(yGrid, xGrid, gameboard);
        yGrid.classList.add(".");
        randomX++;
      }
      return randomShips(maxSize - 1, minSize);
    }
    return randomShips(maxSize, minSize);
  };
  const recieveAttack = async (e) => {
    const yAxis = e.target.getAttribute("data-y");
    const xAxis = e.target.getAttribute("data-x");
    const xyAxis = +yAxis + +xAxis * 10;
    if (attacked(xAxis, yAxis, "hit",'AiGameboard')) {
      console.log("bye");
      return;
    }
    if (!attacked(xAxis, yAxis, ".",'AiGameboard')) {
      console.log("here");
      await props.setBoard((s) => {
        console.log(s);
        s[xyAxis] = <Missed x={xAxis} y={yAxis}/>;
        return s;
      });
    }else{
      console.log("Hitted");
      await props.setBoard((s) => {
        s[xyAxis] = <Hitted x={xAxis} y={yAxis}/>;
        return s;
      });
    }
    forceUpdate(); 
    nextRound();
  };
  useEffect(() => {
    setTimeout(() => {
      randomShips(5, 2);
    }, 500);
  }, []);
  useEffect(() => {
    return (
      <Container>
        {console.log("rendering")}
        <Gameboard
          click={recieveAttack}
          setBoard={props.setBoard}
          drop={null}
          board={props.board}
          boardId="AiGameboard"
        />
      </Container>
    );
  }, [props.board]);
  return (
    <Container>
      {console.log("rendering")}
      <Gameboard
        click={recieveAttack}
        setBoard={props.setBoard}
        drop={null}
        board={props.board}
        boardId="AiGameboard"
      />
    </Container>
  );
};
export default AI;
