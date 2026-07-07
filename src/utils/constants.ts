import {
  AlgorithmSelectType,
  MazeSelectType,
  SpeedSelectType,
  TileType,
} from "./types";

export const createStartTile = (): TileType => ({
  row: 1,
  col: 1,
  isEnd: false,
  isWall: false,
  isPath: false,
  distance: 0,
  isStart: true,
  isTraversed: false,
  parent: null,
});

export const createEndTile = (rows: number, cols: number): TileType => ({
  row: rows - 2,
  col: cols - 2,
  isEnd: true,
  isWall: false,
  isPath: false,
  distance: Infinity,
  isStart: false,
  isTraversed: false,
  parent: null,
});

// export const TILE_STYLE =
//   "w-[14px] h-[14px] md:w-[15px] md:h-[15px] lg:w-[17px] lg:h-[17px] border-t border-r border-sky-200";

export const TILE_STYLE =
  "w-[var(--tile-size)] h-[var(--tile-size)] border-t border-r border-sky-200";

export const TRAVERSED_TILE_STYLE = TILE_STYLE + " bg-cyan-400";
export const START_TILE_STYLE = TILE_STYLE + " bg-green-400";
export const END_TILE_STYLE = TILE_STYLE + " bg-red-400";
export const WALL_TILE_STYLE = TILE_STYLE + " bg-gray-400";
export const PATH_TILE_STYLE = TILE_STYLE + " bg-green-400";

export const MAZES: MazeSelectType[] = [
  { name: "No Maze", value: "NONE" },
  { name: "Binary Tree", value: "BINARY_TREE" },
  { name: "Recursive Division", value: "RECURSIVE_DIVISION" },
];

export const PATHFINDING_ALGORITHMS: AlgorithmSelectType[] = [
  {
    name: "Dijkstra",
    shortName: "Dijkstra",
    value: "DIJKSTRA",
  },
  {
    name: "A-Star",
    shortName: "A*",
    value: "A_STAR",
  },
  {
    name: "Breadth First Search",
    shortName: "BFS",
    value: "BFS",
  },
  {
    name: "Depth First Search",
    shortName: "DFS",
    value: "DFS",
  },
];

export const SPEEDS: SpeedSelectType[] = [
  { name: "Slow", value: 2 },
  { name: "Medium", value: 1 },
  { name: "Fast", value: 0.5 },
];

export const SLEEP_TIME = 8;
export const EXTENDED_SLEEP_TIME = 30;
export const RESET_BUTTON_DELAY = 500;
export const PATH_ANIMATION_DURATION = 1500;
