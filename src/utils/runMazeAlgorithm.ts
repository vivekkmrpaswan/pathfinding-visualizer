import { GridType, MazeType, SpeedType, TileType } from "./types";
import { binaryTree } from "../lib/algorithms/maze/binaryTree";
import { constructBorder } from "./constructBorder";
import recursiveDivision from "../lib/algorithms/maze/recursiveDivision";
import { SPEEDS } from "./constants";

export const runMazeAlgorithm = async ({
  maze,
  grid,
  startTile,
  endTile,
  setIsDisabled,
  speed,
}: {
  maze: MazeType;
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
  setIsDisabled: (isDisabled: boolean) => void;
  speed: SpeedType;
}) => {
  if (maze == "BINARY_TREE") {
    await binaryTree(grid, startTile, endTile, setIsDisabled, speed);
  } else if (maze == "RECURSIVE_DIVISION") {
    const currentSpeed = SPEEDS.find((s) => s.value === speed)!.value ?? 2;
    const totalRows = grid.length;
    const totalCols = grid[0].length;
    await constructBorder(grid, startTile, endTile);
    await recursiveDivision({
      grid,
      startTile,
      endTile,
      row: 1,
      col: 1,
      height: Math.floor((totalRows - 1) / 2),
      width: Math.floor((totalCols - 1) / 2),
      setIsDisabled,
      speed,
    });

    setTimeout(() => {
      setIsDisabled(false);
    }, 800 * currentSpeed);
  }
};
