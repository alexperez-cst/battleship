import React from "react";
import Gameboard from "./Gameboard";
import { Container } from "react-bootstrap";
const Player = (props) => {
  console.log(props.board);
  const onDrop = (el) => {
    el.preventDefault();
    el.stopPropagation();
    const data = el.dataTransfer.getData("text");
    if (+data === 0) {
      return;
    }
    console.log(data, el);
    console.log("here");
    const gridBlock = el.nativeEvent.path[0];
    const yAxis = gridBlock.getAttribute("data-y");
    if (+yAxis + +data <= 10) {
      let actual = gridBlock;
      for (let i = 0; i < +data; i++) {
        actual.classList.add("ship");
        actual = actual.nextElementSibling;
      }
      document.querySelector(`div[class='${data}']`).remove();
      if (!document.querySelectorAll("#ship").length) {
        props.setStart(true);
      }
    }
  };
  return (
    <Container>
      <Gameboard
        click={null}
        board={props.board}
        setBoard={props.setBoard}
        drop={onDrop}
        boardId="gameboard"
      />
    </Container>
  );
};

export default Player;
