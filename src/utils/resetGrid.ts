import {
  END_TILE_CONFIGURATION,
  MAX_ROWS,
  START_TILE_CONFIGURATION,
  TILE_STYLE,
} from "./constants";
import { isEqual } from "./helpers";
import { GridType, TileType } from "./types";

function resetTileVisuals(tile: TileType) {
  const tileElement = document.getElementById(`${tile.row}-${tile.col}`);

  if (!tileElement) {
    return;
  }

  tileElement.className = TILE_STYLE;

  if (tile.row === MAX_ROWS - 1) {
    tileElement.classList.add("border-b");
  }

  if (tile.col === 0) {
    tileElement.classList.add("border-l");
  }
}

function resetTile(tile: TileType, startTile: TileType, endTile: TileType) {
  tile.distance = Infinity;
  tile.isTraversed = false;
  tile.isPath = false;
  tile.parent = null;
  tile.isWall = false;

  const isEndpoint = isEqual(startTile, tile) || isEqual(endTile, tile);

  if (isEndpoint) {
    return;
  }

  resetTileVisuals(tile);
}

export const resetGrid = ({
  grid,
  startTile = START_TILE_CONFIGURATION,
  endTile = END_TILE_CONFIGURATION,
}: {
  grid: GridType;
  startTile?: TileType;
  endTile?: TileType;
}) => {
  for (const row of grid) {
    for (const tile of row) {
      resetTile(tile, startTile, endTile);
    }
  }
};
