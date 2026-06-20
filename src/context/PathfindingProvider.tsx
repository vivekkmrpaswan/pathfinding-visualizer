import { ReactNode, useMemo, useState } from "react";

import { AlgorithmType, GridType, MazeType } from "../utils/types";
import { createGrid } from "../utils/helpers";
import {
  START_TILE_CONFIGURATION,
  END_TILE_CONFIGURATION,
} from "../utils/constants";
import { PathfindingContext } from "./PathfindingContext";

export const PathfindingProvider = ({ children }: { children: ReactNode }) => {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("BFS");
  const [maze, setMaze] = useState<MazeType>("NONE");
  const [grid, setGrid] = useState<GridType>(
    createGrid(START_TILE_CONFIGURATION, END_TILE_CONFIGURATION),
  );
  const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      algorithm,
      setAlgorithm,
      maze,
      setMaze,
      grid,
      setGrid,
      isGraphVisualized,
      setIsGraphVisualized,
    }),
    [algorithm, maze, grid, isGraphVisualized],
  );

  return (
    <PathfindingContext.Provider value={value}>
      {children}
    </PathfindingContext.Provider>
  );
};
