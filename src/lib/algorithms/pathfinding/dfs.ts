import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { checkStack, isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

function visitNeighbor(
  neighbor: TileType,
  currentTile: TileType,
  unTraversedTiles: TileType[],
) {
  if (checkStack(neighbor, unTraversedTiles)) {
    return;
  }

  neighbor.distance = currentTile.distance + 1;
  neighbor.parent = currentTile;
  unTraversedTiles.push(neighbor);
}

function visitNeighbors(
  grid: GridType,
  currentTile: TileType,
  unTraversedTiles: TileType[],
) {
  const neighbors = getUntraversedNeighbors(grid, currentTile);

  for (const neighbor of neighbors) {
    visitNeighbor(neighbor, currentTile, unTraversedTiles);
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

export const dfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
  const traversedTiles: TileType[] = [];
  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  base.isTraversed = true;

  const unTraversedTiles = [base];

  while (unTraversedTiles.length > 0) {
    const currentTile = unTraversedTiles.pop();

    if (!currentTile || currentTile.isWall) continue;
    if (currentTile.distance === Infinity) break;

    currentTile.isTraversed = true;
    traversedTiles.push(currentTile);

    if (isEqual(currentTile, endTile)) break;

    visitNeighbors(grid, currentTile, unTraversedTiles);
  }

  const path = buildPath(grid, endTile);

  return { traversedTiles, path };
};
