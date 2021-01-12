import "./App.css";
import React, { useState } from "react";
function Ship(props) {
  //length
  const createShipParts = (len) => {
    const body = [];
    for (let i = 0; i < len; i++) body.push(1);
    return body;
  };
  const [shipBody, setShipBody] = useState(createShipParts(props.length));

  return <div className="App"></div>;
}

export default Ship;
