import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { dropFromQueue, isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

function relaxNeighbor(
  neighbor: TileType,
  currentTile: TileType,
  unTraversedTiles: TileType[],
) {
  if (currentTile.distance + 1 >= neighbor.distance) {
    return;
  }

  dropFromQueue(neighbor, unTraversedTiles);
  neighbor.distance = currentTile.distance + 1;
  neighbor.parent = currentTile;
  unTraversedTiles.push(neighbor);
}

function relaxNeighbors(
  grid: GridType,
  currentTile: TileType,
  unTraversedTiles: TileType[],
) {
  const neighbors = getUntraversedNeighbors(grid, currentTile);

  for (const neighbor of neighbors) {
    relaxNeighbor(neighbor, currentTile, unTraversedTiles);
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

export const dijkstra = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
) => {
  const traversedTiles: TileType[] = [];

  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  base.isTraversed = true;
  const unTraversedTiles = [base];

  while (unTraversedTiles.length > 0) {
    unTraversedTiles.sort((a, b) => a.distance - b.distance);
    const currentTile = unTraversedTiles.shift();

    if (!currentTile || currentTile.isWall) continue;
    if (currentTile.distance === Infinity) break;

    currentTile.isTraversed = true;
    traversedTiles.push(currentTile);

    if (isEqual(currentTile, endTile)) break;

    relaxNeighbors(grid, currentTile, unTraversedTiles);
  }

  const path = buildPath(grid, endTile);

  return { traversedTiles, path };
};
