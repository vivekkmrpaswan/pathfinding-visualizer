import { GridType, TileType } from "./types";

const retriveHeuristicCost = (currentTile: TileType, endTile: TileType) => {
  const manhattanDistance = 1;

  const row = Math.abs(currentTile.row - endTile.row);
  const col = Math.abs(currentTile.col - endTile.col);

  return manhattanDistance * (row + col);
};

export const initiHeuristicCost = (grid: GridType, endTile: TileType) => {
  const heuristicCost = [];

  for (const element of grid) {
    const row = [];

    for (let j = 0; j < grid[0].length; j++) {
      row.push(retriveHeuristicCost(element[j], endTile));
    }

    heuristicCost.push(row);
  }

  return heuristicCost;
};

export const initFunctionCost = (grid: GridType) => {
  const functionCost = [];

  for (let i = 0; i < grid.length; i++) {
    const row = [];

    for (let j = 0; j < grid[0].length; j++) {
      row.push(Infinity);
    }

    functionCost.push(row);
  }

  return functionCost;
};
