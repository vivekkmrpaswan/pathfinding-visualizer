import { usePathfinding } from "../hooks/usePathfinding";
import { Tile } from "./Tile";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

// Match tile size to CSS breakpoints in TILE_STYLE (constants.ts):
// lg (≥1024px): 17px   md (≥768px): 15px   base: 14px
function getTileSize(): number {
  if (window.innerWidth >= 1024) return 17;
  if (window.innerWidth >= 768) return 15;
  return 14;
}

export function Grid({
  isVisualizationRunningRef,
}: Readonly<{ isVisualizationRunningRef: MutableRefObject<boolean> }>) {
  const { grid, setGrid, maze, rows, cols, setDimensions } = usePathfinding();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const tileSize = getTileSize();

      // Container has p-4 (16px each side = 32px total).
      // Subtract so the grid never causes a scrollbar.
      const padding = 32;
      const availW = container.clientWidth - padding;
      const availH = container.clientHeight - padding;

      if (availW <= 0 || availH <= 0) return;

      let newCols = Math.floor(availW / tileSize);
      let newRows = Math.floor(availH / tileSize);

      // Maze algorithms require odd cell counts (cells live at odd positions,
      // walls at even ones). Force odd on both axes.
      if (newCols % 2 === 0) newCols--;
      if (newRows % 2 === 0) newRows--;

      newCols = Math.max(newCols, 5);
      newRows = Math.max(newRows, 5);

      setDimensions(newRows, newCols);
    };

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);
    updateDimensions();

    return () => observer.disconnect();
  }, [setDimensions]);

  const isDrawingBlocked = (row: number, col: number) =>
    isVisualizationRunningRef.current ||
    checkIfStartOrEnd(row, col, rows, cols) ||
    maze !== "NONE";

  const handleMouseDown = (row: number, col: number) => {
    if (isDrawingBlocked(row, col)) return;
    setIsMouseDown(true);
    setGrid(createNewGrid(grid, row, col));
  };

  const handleMouseUp = (row: number, col: number) => {
    if (isDrawingBlocked(row, col)) return;
    setIsMouseDown(false);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDrawingBlocked(row, col)) return;
    if (isMouseDown) setGrid(createNewGrid(grid, row, col));
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-auto flex justify-center p-4"
    >
      <div className="flex flex-col w-max mx-auto my-auto">
        {grid.map((r, rowIndex) => (
          <div key={rowIndex} className="flex">
            {r.map((tile, tileIndex) => {
              const { row, col, isEnd, isStart, isPath, isTraversed, isWall } =
                tile;
              return (
                <Tile
                  key={tileIndex}
                  row={row}
                  col={col}
                  totalRows={grid.length}
                  isEnd={isEnd}
                  isStart={isStart}
                  isPath={isPath}
                  isTraversed={isTraversed}
                  isWall={isWall}
                  handleMouseDown={() => handleMouseDown(row, col)}
                  handleMouseUp={() => handleMouseUp(row, col)}
                  handleMouseEnter={() => handleMouseEnter(row, col)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
