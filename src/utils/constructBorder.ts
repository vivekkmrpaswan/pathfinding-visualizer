import { MAX_COLS, MAX_ROWS, SLEEP_TIME, WALL_TILE_STYLE } from "./constants";
import { isEqual, sleep } from "./helpers";
import { GridType, TileType } from "./types";

type Direction = { row: number; col: number };
type Position = { row: number; col: number };

const BORDER_DIRECTIONS: Direction[] = [
  { row: 0, col: 1 },
  { row: 1, col: 0 },
  { row: 0, col: -1 },
  { row: -1, col: 0 },
];

function isInBounds(row: number, col: number): boolean {
  return row >= 0 && row < MAX_ROWS && col >= 0 && col < MAX_COLS;
}

function applyWallStyle(row: number, col: number) {
  const tileElement = document.getElementById(`${row}-${col}`);

  if (!tileElement) {
    return;
  }

  const classes = WALL_TILE_STYLE
    ? WALL_TILE_STYLE.split(" ").filter(Boolean)
    : [];
  tileElement.classList.add(...classes, "animate-wall");
}

async function markBorderTile(
  grid: GridType,
  row: number,
  col: number,
  startTile: TileType,
  endTile: TileType,
) {
  const isEndpoint =
    isEqual(grid[row][col], startTile) || isEqual(grid[row][col], endTile);

  if (isEndpoint) {
    return;
  }

  grid[row][col].isWall = true;
  applyWallStyle(row, col);
  await sleep(SLEEP_TIME);
}

async function walkEdge(
  grid: GridType,
  position: Position,
  direction: Direction,
  startTile: TileType,
  endTile: TileType,
) {
  while (
    isInBounds(position.row + direction.row, position.col + direction.col)
  ) {
    position.row += direction.row;
    position.col += direction.col;

    await markBorderTile(grid, position.row, position.col, startTile, endTile);
  }
}

function clampToBounds(position: Position) {
  if (position.row < 0) position.row = 0;
  if (position.row >= MAX_ROWS) position.row = MAX_ROWS - 1;
  if (position.col < 0) position.col = 0;
  if (position.col >= MAX_COLS) position.col = MAX_COLS - 1;
}

export async function constructBorder(
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
) {
  const position: Position = { row: 0, col: 0 };

  for (const direction of BORDER_DIRECTIONS) {
    await walkEdge(grid, position, direction, startTile, endTile);
    clampToBounds(position);
  }
}
