// import { usePathfinding } from "../hooks/usePathfinding";
// import { Tile } from "./Tile";
// import { MutableRefObject, useState } from "react";
// import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

// export function Grid({
//   isVisualizationRunningRef,
// }: Readonly<{
//   isVisualizationRunningRef: MutableRefObject<boolean>;
// }>) {
//   const { grid, setGrid, maze } = usePathfinding();
//   const [isMouseDown, setIsMouseDown] = useState(false);

//   const isDrawingBlocked = (row: number, col: number) =>
//     isVisualizationRunningRef.current ||
//     checkIfStartOrEnd(row, col) ||
//     maze !== "NONE";

//   const handleMouseDown = (row: number, col: number) => {
//     if (isDrawingBlocked(row, col)) {
//       return;
//     }

//     setIsMouseDown(true);
//     const newGrid = createNewGrid(grid, row, col);
//     setGrid(newGrid);
//   };

//   const handleMouseUp = (row: number, col: number) => {
//     if (isDrawingBlocked(row, col)) {
//       return;
//     }

//     setIsMouseDown(false);
//   };

//   const handleMouseEnter = (row: number, col: number) => {
//     if (isDrawingBlocked(row, col)) {
//       return;
//     }
//     if (isMouseDown) {
//       const newGrid = createNewGrid(grid, row, col);
//       setGrid(newGrid);
//     }
//   };

//   return (
//     <div className="flex flex-col border-sky-300 m-auto">
//       {grid.map((r, rowIndex) => (
//         <div key={rowIndex} className="flex">
//           {r.map((tile, tileIndex) => {
//             const { row, col, isEnd, isStart, isPath, isTraversed, isWall } =
//               tile;

//             return (
//               <Tile
//                 key={tileIndex}
//                 row={tile.row}
//                 col={tile.col}
//                 isEnd={isEnd}
//                 isStart={isStart}
//                 isPath={isPath}
//                 isTraversed={isTraversed}
//                 isWall={isWall}
//                 handleMouseDown={() => handleMouseDown(row, col)}
//                 handleMouseUp={() => handleMouseUp(row, col)}
//                 handleMouseEnter={() => handleMouseEnter(row, col)}
//               />
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// }

import { usePathfinding } from "../hooks/usePathfinding";
import { Tile } from "./Tile";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

export function Grid({
  isVisualizationRunningRef,
}: Readonly<{ isVisualizationRunningRef: MutableRefObject<boolean> }>) {
  const { grid, setGrid, maze } = usePathfinding();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const gridEl = gridRef.current;
    if (!container || !gridEl) return;

    const updateScale = () => {
      // offsetWidth/Height give the natural (pre-transform) layout size.
      // CSS transform does NOT affect these values, so reading them here
      // won't create a feedback loop when the scale state changes.
      const naturalW = gridEl.offsetWidth;
      const naturalH = gridEl.offsetHeight;
      if (naturalW === 0 || naturalH === 0) return;

      const scaleX = container.clientWidth / naturalW;
      const scaleY = container.clientHeight / naturalH;

      if (window.innerWidth < 768) {
        // phones: fit width only
        setScale(scaleX);
      } else {
        // tablets/desktops: fit both dimensions
        setScale(Math.min(scaleX, scaleY));
      }
      // Cap at 1 — only scale down to fit, never zoom in on small screens.
      // setScale(Math.min(scaleX, scaleY, 1));
    };

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    updateScale();

    return () => observer.disconnect();
  }, []);

  const isDrawingBlocked = (row: number, col: number) =>
    isVisualizationRunningRef.current ||
    checkIfStartOrEnd(row, col) ||
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
      className="h-full w-full flex justify-center landscape:items-center portrait:items-start overflow-auto p-4"
    >
      <div
        ref={gridRef}
        style={{ transform: `scale(${scale})` }}
        className="flex flex-col border-sky-300 shrink-0"
      >
        {grid.map((r, rowIndex) => (
          <div key={rowIndex} className="flex">
            {r.map((tile, tileIndex) => {
              const { row, col, isEnd, isStart, isPath, isTraversed, isWall } =
                tile;
              return (
                <Tile
                  key={tileIndex}
                  row={tile.row}
                  col={tile.col}
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
