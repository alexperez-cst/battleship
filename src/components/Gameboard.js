import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
function Gameboard(props) {
  const createGameboard = () => {
    const grid = [];
    for (let i = 0; i < 10; i++) {
      grid.push(<Row x={i}></Row>);
      for (let j = 0; j < 10; j++) {
        setGameboard((s) => {
          s[i + j] = null;
          return s;
        });
        grid[i].appendChild(<Col y={j}></Col>);
      }
    }
    return grid;
  };
  const [gameboard, setGameboard] = useState(createGameboard());
  return <div>{createGameboard().map((a) => a)}</div>;
}
