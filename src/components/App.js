import React, { useState } from "react";
import AI from "./AI";
import Player from "./Player";
import { Container } from "react-bootstrap";
function App() {
  const [AIBoard, setAIBoard] = useState({});
  const [PlayerBoard, setPlayerBoard] = useState({});
  return (
    <div id="app">
      <Container>
        <Player board={PlayerBoard} />
      </Container>
      <Container>
        <AI board={AIBoard} />
      </Container>
    </div>
  );
}
export default App;
