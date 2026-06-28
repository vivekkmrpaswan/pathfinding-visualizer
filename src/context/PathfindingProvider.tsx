import { ReactNode, useEffect, useMemo, useState } from "react";

import { AlgorithmType, GridType, MazeType } from "../utils/types";
import { createGrid } from "../utils/helpers";
import { PathfindingContext } from "./PathfindingContext";
import { useGridDimensions } from "../hooks/useGridDimensions";
import { createStartTile, createEndTile } from "../utils/constants";

export const PathfindingProvider = ({ children }: { children: ReactNode }) => {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("BFS");
  const [maze, setMaze] = useState<MazeType>("NONE");
  const { rows, cols } = useGridDimensions();
  console.log({
    rows,
    cols,
  });
  const [startTile, setStartTile] = useState(() => createStartTile());

  const [endTile, setEndTile] = useState(() => createEndTile(rows, cols));

  const [grid, setGrid] = useState<GridType>(() =>
    createGrid(rows, cols, createStartTile(), createEndTile(rows, cols)),
  );
  const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);

  useEffect(() => {
    const newStartTile = createStartTile();
    const newEndTile = createEndTile(rows, cols);

    setStartTile(newStartTile);
    setEndTile(newEndTile);

    setGrid(createGrid(rows, cols, newStartTile, newEndTile));
  }, [rows, cols]);

  const value = useMemo(
    () => ({
      algorithm,
      setAlgorithm,
      maze,
      setMaze,
      grid,
      setGrid,
      startTile,
      setStartTile,
      endTile,
      setEndTile,
      rows,
      cols,
      isGraphVisualized,
      setIsGraphVisualized,
    }),
    [algorithm, maze, grid, startTile, endTile, rows, cols, isGraphVisualized],
  );

  return (
    <PathfindingContext.Provider value={value}>
      {children}
    </PathfindingContext.Provider>
  );
};
