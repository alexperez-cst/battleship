import "./App.css";
import React, { useState } from "react";

function Ship(props) {
  //length
  const createShipParts = (len) => {
    const body = [];
    for (let i = 0; i < len; i++) body.push(1);
    return body;
  };
  const [shipBody, setShipBody] = useState(createShipParts(props.index));
  const [isSunk, setIsSunk] = useState(false);
  const hit = (index) => {
    if (shipBody[index] === 0) {
      return false;
    }
    setShipBody((s) => [s.slice(0, index), 0, s.slice(index + 1)]);
  };
  return { hit, createShipParts, shipBody, isSunk };
}
export default Ship;
