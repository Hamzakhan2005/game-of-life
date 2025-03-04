import { useState, useEffect } from "react";
import Grid from "./components/Grid";
import Nav from "./components/Nav";
import Controls from "./components/Controls";
import "./App.css";
function App() {
  const [liveCells, setLiveCells] = useState(new Set());
  const [isRunning, setIsRunning] = useState(false);

  // Function to update the grid for the next generation
  const updateGrid = () => {
    setLiveCells((prevLiveCells) => nextGeneration(prevLiveCells));
  };

  // AutoPlay: Runs next generation automatically at an interval
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(updateGrid, 300); // Adjust speed here (500ms)
    return () => clearInterval(interval); // Cleanup on unmount or stop
  }, [isRunning]); // Runs when isRunning changes

  // Function to toggle AutoPlay on/off
  const toggleAutoPlay = () => {
    setIsRunning((prev) => !prev);
  };

  // Function to update the grid for the next generation

  // Game of Life logic (same as before)
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  const clearGrid = () => {
    setLiveCells(new Set()); // Clear live cells
    // setGrid(Array.from({ length: rows }, () => Array(cols).fill(false))); // Reset grid
  };
  const nextGeneration = (liveCellsSet) => {
    const newLiveCells = new Set();
    const neighborCounts = new Map();

    liveCellsSet.forEach((cellKey) => {
      const [row, col] = cellKey.split(",").map(Number);

      directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        const key = `${newRow},${newCol}`;

        neighborCounts.set(key, (neighborCounts.get(key) || 0) + 1);
      });
    });

    neighborCounts.forEach((count, key) => {
      const isAlive = liveCellsSet.has(key);
      if (
        (isAlive && (count === 2 || count === 3)) ||
        (!isAlive && count === 3)
      ) {
        newLiveCells.add(key);
      }
    });

    return newLiveCells;
  };

  return (
    <>
      <Nav />
      <Grid liveCells={liveCells} setLiveCells={setLiveCells} />
      <Controls
        updateGrid={updateGrid}
        toggleAutoPlay={toggleAutoPlay}
        isRunning={isRunning}
        clearGrid={clearGrid}
      />
    </>
  );
}

export default App;
