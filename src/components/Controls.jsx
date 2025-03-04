import React from "react";
import "../styles/Controls.css";
const Controls = ({ updateGrid, toggleAutoPlay, isRunning, clearGrid }) => {
  return (
    <div className="controls ">
      <button
        onClick={updateGrid}
        className="controls-toggle p-4 m-4 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 "
      >
        Start
      </button>
      <button
        onClick={toggleAutoPlay}
        className="bg-blue-500 p-4 m-4 rounded-full shadow-lg shadow-blue-500/50 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 "
      >
        {isRunning ? "Stop AutoPlay" : "Start AutoPlay"}
      </button>
      <button
        onClick={clearGrid}
        className="bg-indigo-500 p-4 m-4 rounded-full shadow-lg shadow-indigo-500/50 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 "
      >
        Clear
      </button>
    </div>
  );
};

export default Controls;
