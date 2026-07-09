import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { dropFromQueue, isEqual } from "../../../utils/helpers";
import {
  initFunctionCost,
  initiHeuristicCost,
} from "../../../utils/heuristics";
import { GridType, TileType } from "../../../utils/types";

function compareByCost(
  a: TileType,
  b: TileType,
  functionCost: number[][],
): number {
  if (functionCost[a.row][a.col] === functionCost[b.row][b.col]) {
    return b.distance - a.distance;
  }
  return functionCost[a.row][a.col] - functionCost[b.row][b.col];
}

function relaxNeighbor(
  neighbor: TileType,
  currentTile: TileType,
  functionCost: number[][],
  heuristicCost: number[][],
  unTraversedTiles: TileType[],
) {
  const distanceToNeighbor = currentTile.distance + 1;

  if (distanceToNeighbor >= neighbor.distance) {
    return;
  }

  dropFromQueue(neighbor, unTraversedTiles);
  neighbor.distance = distanceToNeighbor;
  functionCost[neighbor.row][neighbor.col] =
    neighbor.distance + heuristicCost[neighbor.row][neighbor.col];
  neighbor.parent = currentTile;
  unTraversedTiles.push(neighbor);
}

function relaxNeighbors(
  grid: GridType,
  currentTile: TileType,
  functionCost: number[][],
  heuristicCost: number[][],
  unTraversedTiles: TileType[],
) {
  const neighbors = getUntraversedNeighbors(grid, currentTile);

  for (const neighbor of neighbors) {
    relaxNeighbor(
      neighbor,
      currentTile,
      functionCost,
      heuristicCost,
      unTraversedTiles,
    );
  }
}

function buildPath(grid: GridType, endTile: TileType): TileType[] {
  const path: TileType[] = [];
  let current = grid[endTile.row][endTile.col];

  while (current !== null) {
    current.isPath = true;
    path.unshift(current);
    current = current.parent!;
  }

  return path;
}

export const aStar = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
) => {
  const traversedTiles: TileType[] = [];
  const heuristicCost = initiHeuristicCost(grid, endTile);
  const functionCost = initFunctionCost(grid);

  const base = grid[startTile.row][startTile.col];
  base.distance = 0;

  functionCost[base.row][base.col] =
    base.distance + heuristicCost[base.row][base.col];
  base.isTraversed = true;
  const unTraversedTiles = [base];

  while (unTraversedTiles.length > 0) {
    unTraversedTiles.sort((a, b) => compareByCost(a, b, functionCost));

    const currentTile = unTraversedTiles.shift();

    if (!currentTile || currentTile.isWall) continue;
    if (currentTile.distance === Infinity) break;

    currentTile.isTraversed = true;
    traversedTiles.push(currentTile);

    if (isEqual(currentTile, endTile)) break;

    relaxNeighbors(
      grid,
      currentTile,
      functionCost,
      heuristicCost,
      unTraversedTiles,
    );
  }

  const path = buildPath(grid, endTile);

  return { traversedTiles, path };
};
