import { SPEEDS, WALL_TILE_STYLE } from "./constants";
import { isRowColEqual } from "./helpers";
import { SpeedType, TileType, GridType } from "./types";

export const createWall = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  speed: SpeedType,
) => {
  const delay = 6 * SPEEDS.find((s) => s.value === speed)!.value - 1;

  for (let row = 0; row < grid.length; row++) {
    setTimeout(
      () => {
        for (let col = 0; col < grid[0].length; col++) {
          if (row % 2 === 0 || col % 2 === 0) {
            if (
              !isRowColEqual(row, col, startTile) &&
              !isRowColEqual(row, col, endTile)
            ) {
              setTimeout(() => {
                document.getElementById(`${row}-${col}`)!.className =
                  `${WALL_TILE_STYLE} animate-wall`;
              }, delay * col);
            }
          }
        }
      },
      delay * (grid.length / 2) * row,
    );
  }
};
