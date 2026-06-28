import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { AlgorithmType, GridType, MazeType } from "../utils/types";
import { createGrid } from "../utils/helpers";
import { PathfindingContext } from "./PathfindingContext";
import { useGridDimensions } from "../hooks/useGridDimensions";
import { createStartTile, createEndTile } from "../utils/constants";

export const PathfindingProvider = ({ children }: { children: ReactNode }) => {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("BFS");
  const [maze, setMaze] = useState<MazeType>("NONE");

  // Seeded from viewport-based estimate; refined by Grid.tsx's ResizeObserver.
  const { rows: initialRows, cols: initialCols } = useGridDimensions();
  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(initialCols);

  const [startTile, setStartTile] = useState(() => createStartTile());
  const [endTile, setEndTile] = useState(() => createEndTile(rows, cols));
  const [grid, setGrid] = useState<GridType>(() =>
    createGrid(rows, cols, createStartTile(), createEndTile(rows, cols)),
  );
  const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);

  // Called by Grid.tsx's ResizeObserver with the precise container-derived dimensions.
  // useCallback keeps the reference stable so Grid's useEffect doesn't re-register
  // the observer on every render.
  const setDimensions = useCallback((newRows: number, newCols: number) => {
    setRows(newRows);
    setCols(newCols);
  }, []);

  // Recreate the grid (and reposition start/end) whenever dimensions change.
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
      setDimensions,
      isGraphVisualized,
      setIsGraphVisualized,
    }),
    [
      algorithm,
      maze,
      grid,
      startTile,
      endTile,
      rows,
      cols,
      setDimensions,
      isGraphVisualized,
    ],
  );

  return (
    <PathfindingContext.Provider value={value}>
      {children}
    </PathfindingContext.Provider>
  );
};
