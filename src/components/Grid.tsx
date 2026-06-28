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
import { MutableRefObject, useState } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

export function Grid({
  isVisualizationRunningRef,
}: Readonly<{ isVisualizationRunningRef: MutableRefObject<boolean> }>) {
  const { grid, setGrid, maze, rows, cols } = usePathfinding();
  const [isMouseDown, setIsMouseDown] = useState(false);

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
    <div className="w-full h-full overflow-auto flex justify-center p-4">
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
