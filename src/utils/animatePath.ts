import {
  EXTENDED_SLEEP_TIME,
  PATH_TILE_STYLE,
  SLEEP_TIME,
  SPEEDS,
  TRAVERSED_TILE_STYLE,
} from "./constants";
import { isEqual } from "./helpers";
import { SpeedType, TileType } from "./types";

export const animatePath = (
  traversedTiles: TileType[],
  path: TileType[],
  startTile: TileType,
  endTile: TileType,
  speed: SpeedType,
): Promise<void> => {
  const speedMultiplier = SPEEDS.find((s) => s.value === speed)!.value;

  return new Promise((resolve) => {
    for (let i = 0; i < traversedTiles.length; i++) {
      setTimeout(
        () => {
          const tile = traversedTiles[i];
          if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
            document.getElementById(`${tile.row}-${tile.col}`)!.className =
              `${TRAVERSED_TILE_STYLE} animate-traversed`;
          }
        },
        SLEEP_TIME * i * speedMultiplier,
      );
    }

    setTimeout(
      () => {
        if (path.length === 0) {
          resolve();
          return;
        }
        for (let i = 0; i < path.length; i++) {
          setTimeout(
            () => {
              const tile = path[i];
              if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
                document.getElementById(`${tile.row}-${tile.col}`)!.className =
                  `${PATH_TILE_STYLE} animate-path`;
              }
              if (i === path.length - 1) {
                resolve();
              }
            },
            EXTENDED_SLEEP_TIME * i * speedMultiplier,
          );
        }
      },
      SLEEP_TIME * traversedTiles.length * speedMultiplier,
    );
  });
};
