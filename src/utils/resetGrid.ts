import { TILE_STYLE } from "./constants";
import { isEqual } from "./helpers";
import { GridType, TileType } from "./types";

function resetTileVisuals(tile: TileType, totalRows: number) {
  const tileElement = document.getElementById(`${tile.row}-${tile.col}`);

  if (!tileElement) {
    return;
  }

  tileElement.className = TILE_STYLE;

  if (tile.row === totalRows - 1) {
    tileElement.classList.add("border-b");
  }

  if (tile.col === 0) {
    tileElement.classList.add("border-l");
  }
}

function resetTile(
  tile: TileType,
  startTile: TileType,
  endTile: TileType,
  totalRows: number,
) {
  tile.distance = Infinity;
  tile.isTraversed = false;
  tile.isPath = false;
  tile.parent = null;
  tile.isWall = false;

  const isEndpoint = isEqual(startTile, tile) || isEqual(endTile, tile);

  if (isEndpoint) {
    return;
  }

  resetTileVisuals(tile, totalRows);
}

export const resetGrid = ({
  grid,
  startTile,
  endTile,
}: {
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
}) => {
  const totalRows = grid.length;
  for (const row of grid) {
    for (const tile of row) {
      resetTile(tile, startTile, endTile, totalRows);
    }
  }
};
