import React from "react";
import "../styles/Controls.css";
const Controls = ({ updateGrid, toggleAutoPlay, isRunning, clearGrid }) => {
  return (
    <div className="controls">
      <button onClick={updateGrid} className="controls-toggle">
        Start
      </button>
      <button onClick={toggleAutoPlay}>
        {isRunning ? "Stop AutoPlay" : "Start AutoPlay"}
      </button>
      <button onClick={clearGrid}>Clear</button>
    </div>
  );
};

export default Controls;
