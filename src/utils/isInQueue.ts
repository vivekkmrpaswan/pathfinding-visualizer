import { isEqual } from "./helpers";
import { TileType } from "./types";

export function isInQueue(tile: TileType, queue: TileType[]) {
  for (const element of queue) {
    if (isEqual(tile, element)) return true;
  }
  return false;
}
