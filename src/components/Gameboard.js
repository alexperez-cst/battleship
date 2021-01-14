import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

function Gameboard(props) {
  const createGameboard = () => {
    const protoGrid = [];
    const board = {};
    for (let i = 0; i < 10; i++) {
      protoGrid.push(<Row x={i}></Row>);
      for (let j = 0; j < 10; j++) {
        board[i + j] = null;
        protoGrid[i].appendChild(<Col y={j} onClick={props.click}></Col>);
      }
    }
    setGrid(protoGrid);
    return grid;
  };
  const [grid, setGrid] = useState([]);
  return (
    <div>
      {grid.length ? null : createGameboard()}
      {grid.map((a) => a)}
    </div>
  );
}

export default Gameboard;
