import { usePathfinding } from "../hooks/usePathfinding";
import { Tile } from "./Tile";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { checkIfStartOrEnd, createNewGrid, setWallAt } from "../utils/helpers";

function getTileSize(): number {
  if (window.innerWidth >= 1024) return 20; // desktop — mouse, precise
  if (window.innerWidth >= 768) return 24; // tablet — touch
  return 26; // mobile — touch, needs the most room per finger
}

function getTileFromPoint(
  x: number,
  y: number,
): { row: number; col: number } | null {
  const element = document.elementFromPoint(x, y);
  if (!element?.id) return null;

  const parts = element.id.split("-");
  if (parts.length !== 2) return null;

  const row = Number(parts[0]);
  const col = Number(parts[1]);
  if (isNaN(row) || isNaN(col)) return null;

  return { row, col };
}

export function Grid({
  isVisualizationRunningRef,
}: Readonly<{ isVisualizationRunningRef: MutableRefObject<boolean> }>) {
  const { grid, setGrid, maze, rows, cols, setDimensions } = usePathfinding();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [tileSize, setTileSize] = useState(getTileSize());
  const containerRef = useRef<HTMLDivElement>(null);

  const isDrawingRef = useRef(false);
  const lastDrawnTileRef = useRef<{ row: number; col: number } | null>(null);
  const drawModeRef = useRef<boolean | null>(null); // true = adding walls, false = erasing

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      // Ignore resize while a maze/pathfinding animation is running
      if (isVisualizationRunningRef.current) return;

      const currentTileSize = getTileSize();
      setTileSize(currentTileSize);

      const padding = 32;
      const availW = container.clientWidth - padding;
      const availH = container.clientHeight - padding;

      if (availW <= 0 || availH <= 0) return;

      let newCols = Math.floor(availW / currentTileSize);
      let newRows = Math.floor(availH / currentTileSize);

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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;

    const tile = getTileFromPoint(e.clientX, e.clientY);
    if (!tile || isDrawingBlocked(tile.row, tile.col)) return;

    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);

    isDrawingRef.current = true;
    lastDrawnTileRef.current = tile;

    const currentTileState = grid[tile.row]?.[tile.col];
    const mode = !currentTileState?.isWall;
    drawModeRef.current = mode;

    setGrid((prev) => setWallAt(prev, tile.row, tile.col, mode));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" || !isDrawingRef.current) return;

    const tile = getTileFromPoint(e.clientX, e.clientY);
    if (!tile || isDrawingBlocked(tile.row, tile.col)) return;

    const last = lastDrawnTileRef.current;
    if (last?.row === tile.row && last?.col === tile.col) return;

    const mode = drawModeRef.current;
    if (mode === null) return;

    lastDrawnTileRef.current = tile;
    setGrid((prev) => setWallAt(prev, tile.row, tile.col, mode));
  };

  const stopDrawing = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    isDrawingRef.current = false;
    lastDrawnTileRef.current = null;
    drawModeRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      style={{ "--tile-size": `${tileSize}px` } as React.CSSProperties}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDrawing}
      onPointerCancel={stopDrawing}
      className="w-full h-full overflow-auto flex justify-center p-4 touch-none"
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
