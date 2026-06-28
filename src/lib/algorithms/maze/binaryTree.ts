import { GridType, SpeedType, TileType } from "../../../utils/types";
import { createWall } from "../../../utils/createWall";
import { getRandInt, isEqual, sleep } from "../../../utils/helpers";
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
  totalRows: number,
  totalCols: number,
) {
  const isBottomRightCorner = row === totalRows - 2 && col === totalCols - 2;

  const isLastRow = row === totalRows - 2;
  const isLastCol = col === totalCols - 2;

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

async function carvePassages(
  grid: GridType,
  speed: SpeedType,
  totalRows: number,
  totalCols: number,
) {
  for (let row = 1; row < totalRows; row += 2) {
    for (let col = 1; col < totalCols; col += 2) {
      await carveCell(grid, row, col, speed, totalRows, totalCols);
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
  const totalRows = grid.length;
  const totalCols = grid[0].length;
  createWall(grid, startTile, endTile, speed);
  await sleep(totalRows * totalCols);

  buildWallLattice(grid, startTile, endTile);
  await carvePassages(grid, speed, totalRows, totalCols);

  setIsDisabled(false);
};
