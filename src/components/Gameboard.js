import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";

function Gameboard(props) {
  const createGameboard = () => {
    const protoBoard = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        protoBoard.push(
          <div
            onClick={props.click}
            data-x={i}
            data-y={j}
            onDrop={props.drop}
            onDragOver={(x) => x.preventDefault()}
            style={{
              height: "100%",
              width: "100%",
              borderTop: "2px solid white",
              borderBottom: "2px solid white",
              borderRight: "2px solid white",
              borderLeft: `${j === 0 ? "2px solid white" : "0px"}`,
              margin: "0",
              padding: "0",
              boxSizing: "border-box",
            }}
          ></div>
        );
      }
    }
    props.setBoard(protoBoard);
  };
  return (
    <div id={props.boardId}>
      {props.board.length ? null : createGameboard()}
      {console.log(props.board)}
      {props.board.map((a) => a)}
    </div>
  );
}

export default Gameboard;
