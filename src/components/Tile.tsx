import { twMerge } from "tailwind-merge";
import {
  END_TILE_STYLE,
  PATH_TILE_STYLE,
  START_TILE_STYLE,
  TILE_STYLE,
  TRAVERSED_TILE_STYLE,
  WALL_TILE_STYLE,
} from "../utils/constants";

type MouseFunction = (row: number, col: number) => void;

export function Tile({
  row,
  col,
  totalRows,
  isStart,
  isEnd,
  isTraversed,
  isWall,
  isPath,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
}: Readonly<{
  row: number;
  col: number;
  totalRows: number;
  isStart: boolean;
  isEnd: boolean;
  isTraversed: boolean;
  isWall: boolean;
  isPath: boolean;
  handleMouseDown: MouseFunction;
  handleMouseUp: MouseFunction;
  handleMouseEnter: MouseFunction;
}>) {
  let tileTyleStyle;

  if (isStart) {
    tileTyleStyle = START_TILE_STYLE;
  } else if (isEnd) {
    tileTyleStyle = END_TILE_STYLE;
  } else if (isWall) {
    tileTyleStyle = WALL_TILE_STYLE;
  } else if (isPath) {
    tileTyleStyle = PATH_TILE_STYLE;
  } else if (isTraversed) {
    tileTyleStyle = TRAVERSED_TILE_STYLE;
  } else {
    tileTyleStyle = TILE_STYLE;
  }

  let borderStyle;

  if (row === totalRows - 1) {
    borderStyle = "border-b";
  } else if (col === 0) {
    borderStyle = "border-l";
  } else {
    borderStyle = "";
  }

  const edgeStyle = row === totalRows - 1 && col === 0 ? "border-l" : "";
  return (
    <div // NOSONAR-drawable grid cell, one of ~1,900 tiles; making each one individually
      // focusable/tabbable would hurt keyboard navigation more than it helps for this project's scope
      className={twMerge(tileTyleStyle, borderStyle, edgeStyle)}
      id={`${row}-${col}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={() => handleMouseUp(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
    />
  );
}
