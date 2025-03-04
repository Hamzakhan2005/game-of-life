import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "../styles/Grid.css";
const Grid = ({ liveCells, setLiveCells }) => {
  const canvasRef = useRef(null);
  const [cellSize, setCellSize] = useState(20); // Initial cell size

  const cols = Math.floor(window.innerWidth / cellSize);
  const rows = Math.floor(window.innerHeight / cellSize);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const cellKey = `${y},${x}`;
          ctx.fillStyle = liveCells.has(cellKey) ? "black" : "white";
          ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
        }
      }
    };

    drawGrid();
  }, [cellSize, liveCells]);
  const handleZoom = (event) => {
    event.preventDefault();
    let newSize = cellSize + (event.deltaY < 0 ? 2 : -2); // Zoom in/out

    // Set min/max limits for cell size
    newSize = Math.min(Math.max(newSize, 5), 50);

    setCellSize(newSize);
  };
  const handleClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    const cellKey = `${row},${col}`;

    setLiveCells((prevLiveCells) => {
      const newLiveCells = new Set(prevLiveCells);
      if (newLiveCells.has(cellKey)) {
        newLiveCells.delete(cellKey);
      } else {
        newLiveCells.add(cellKey);
      }
      return newLiveCells;
    });
  };
  return (
    <canvas
      className="grid"
      ref={canvasRef}
      onClick={handleClick}
      onWheel={handleZoom}
    ></canvas>
  );
};

export default Grid;
