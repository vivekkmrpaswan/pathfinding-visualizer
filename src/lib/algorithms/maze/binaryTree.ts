import { GridType, SpeedType, TileType } from "../../../utils/types";
import { createWall } from "../../../utils/createWall";
import { getRandInt, isEqual, sleep } from "../../../utils/helpers";
import { MAX_COLS, MAX_ROWS } from "../../../utils/constants";
import { destroyWall } from "../../../utils/destroyWall";

function buildWallLattice(
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
) {
  for (const row of grid) {
    for (const tile of row) {
      const isLatticePosition = tile.row % 2 === 0 || tile.col % 2 === 0;
      const isEndpoint = isEqual(tile, startTile) || isEqual(tile, endTile);

      if (isLatticePosition && !isEndpoint) {
        tile.isWall = true;
      }
    }
  }
}

async function carveCell(
  grid: GridType,
  row: number,
  col: number,
  speed: SpeedType,
) {
  const isBottomRightCorner = row === MAX_ROWS - 2 && col === MAX_COLS - 2;
  const isLastRow = row === MAX_ROWS - 2;
  const isLastCol = col === MAX_COLS - 2;

  if (isBottomRightCorner) {
    return;
  }

  if (isLastRow) {
    await destroyWall(grid, row, col, 1, speed);
    return;
  }

  if (isLastCol) {
    await destroyWall(grid, row, col, 0, speed);
    return;
  }

  await destroyWall(grid, row, col, getRandInt(0, 2), speed);
}

async function carvePassages(grid: GridType, speed: SpeedType) {
  for (let row = 1; row < MAX_ROWS; row += 2) {
    for (let col = 1; col < MAX_COLS; col += 2) {
      await carveCell(grid, row, col, speed);
    }
  }
}

export const binaryTree = async (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  setIsDisabled: (isDisabled: boolean) => void,
  speed: SpeedType,
) => {
  createWall(startTile, endTile, speed);
  await sleep(MAX_ROWS * MAX_COLS);

  buildWallLattice(grid, startTile, endTile);
  await carvePassages(grid, speed);

  setIsDisabled(false);
};
