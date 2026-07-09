import { createContext, Dispatch, SetStateAction } from "react";
import { AlgorithmType, GridType, MazeType, TileType } from "../utils/types";

export interface PathfindingContextInterface {
  algorithm: AlgorithmType;
  setAlgorithm: (algorithm: AlgorithmType) => void;

  maze: MazeType;
  setMaze: (maze: MazeType) => void;

  grid: GridType;
  setGrid: Dispatch<SetStateAction<GridType>>;

  rows: number;
  cols: number;
  setDimensions: (rows: number, cols: number) => void;

  startTile: TileType;
  setStartTile: (tile: TileType) => void;

  endTile: TileType;
  setEndTile: (tile: TileType) => void;

  isGraphVisualized: boolean;
  setIsGraphVisualized: (isGraphVisualized: boolean) => void;
}

export const PathfindingContext = createContext<
  PathfindingContextInterface | undefined
>(undefined);
