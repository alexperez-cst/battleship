import "./App.css";
import { Row, Col } from "react-bootstrap";
import React, { useState } from "react";

function Ship(props) {
  //length
  const dragStart = (e, data) => {
    console.log(e);
    console.log("dragStart");
    e.dataTransfer.setData("text/plain", data);
    console.log(e.dataTransfer.getData("text"));
  };
  const shipImg = () => {
    const ship = [];
    for (let i = 0; i < props.index; i++) {
      ship.push(
        <Col
          style={{
            width: "9vw",
            height: "9vw",
            border: "1px solid black",
            backgroundColor: "grey",
            margin: "0",
            padding: "0",
            boxSizing: "border-box",
          }}
          id="ship"
        />
      );
    }
    return ship;
  };
  return (
    <div
      id="protoShip"
      class={props.index}
      draggable={true}
      onDragOver={(x) => x.preventDefault()}
      onDragStart={(e) => dragStart(e, e.target.getAttribute("nodedata"))}
      nodedata={props.index}
      style={{ width: `${props.index * 9}vw` }}
    >
      {shipImg().map((a) => a)}
    </div>
  );
}
export default Ship;
