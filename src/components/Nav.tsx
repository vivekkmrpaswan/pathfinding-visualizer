import { usePathfinding } from "../hooks/usePathfinding";
import { Select } from "./Select";
import {
  MAZES,
  PATHFINDING_ALGORITHMS,
  RESET_BUTTON_DELAY,
  SPEEDS,
} from "../utils/constants";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { resetGrid } from "../utils/resetGrid";
import { useTile } from "../hooks/useTile";
import { useState, MutableRefObject } from "react";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { useSpeed } from "../hooks/useSpeed";
import { PlayButton } from "./PlayButton";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
import { animatePath } from "../utils/animatePath";

export function Nav({
  isVisualizationRunningRef,
}: Readonly<{ isVisualizationRunningRef: MutableRefObject<boolean> }>) {
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    maze,
    setMaze,
    grid,
    setGrid,
    isGraphVisualized,
    setIsGraphVisualized,
    algorithm,
    setAlgorithm,
  } = usePathfinding();
  const { startTile, endTile } = useTile();
  const { speed, setSpeed } = useSpeed();

  const handleGenerateMaze = (maze: MazeType) => {
    if (maze === "NONE") {
      setMaze(maze);
      resetGrid({ grid, startTile, endTile });
      return;
    }
    setMaze(maze);
    setIsDisabled(true);
    resetGrid({ grid, startTile, endTile });
    runMazeAlgorithm({ maze, grid, startTile, endTile, setIsDisabled, speed });
    setGrid(grid.slice());
    setIsGraphVisualized(false);
  };

  const handlerRunVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      setMaze("NONE");
      resetGrid({ grid: grid.slice(), startTile, endTile });
      return;
    }

    const { traversedTiles, path } = runPathfindingAlgorithm({
      algorithm,
      grid,
      startTile,
      endTile,
    });

    setIsDisabled(true);
    isVisualizationRunningRef.current = true;

    animatePath(traversedTiles, path, startTile, endTile, speed).then(() => {
      setGrid(grid.slice());
      setTimeout(() => {
        setIsGraphVisualized(true);
        setIsDisabled(false);
        isVisualizationRunningRef.current = false;
      }, RESET_BUTTON_DELAY);
    });
  };

  return (
    <div className="flex shrink-0 shadow-gray-600 landscape:flex-col landscape:items-start landscape:h-screen landscape:w-64 landscape:border-r landscape:px-5 landscape:py-8 landscape:overflow-y-auto portrait:flex-row portrait:flex-wrap portrait:w-full portrait:border-b portrait:px-4 portrait:py-2 portrait:gap-3">
      {/* Logo — portrait row 1 left, landscape column top */}
      <div className="flex items-center gap-2 landscape:w-full landscape:mb-8 portrait:shrink-0 portrait:order-1">
        <img
          src="/pathfinding-visualizer.png"
          alt="pathfinding visualizer"
          className="w-8 h-8"
        />
        <h1 className="font-bold leading-tight text-start landscape:block portrait:hidden">
          Pathfinding <span className="text-amber-400">Visualizer</span>
        </h1>
      </div>

      {/* Selects — portrait row 2 (order-3, w-full), landscape vertical stack */}
      <div className="flex landscape:flex-col landscape:space-y-5 landscape:w-full portrait:flex-row portrait:order-3 portrait:w-full portrait:gap-2">
        <Select
          label="Maze"
          value={maze}
          options={MAZES}
          onChange={(e) => handleGenerateMaze(e.target.value as MazeType)}
        />
        <Select
          label="Graph"
          value={algorithm}
          options={PATHFINDING_ALGORITHMS}
          onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
        />
        <Select
          label="Speed"
          value={speed}
          options={SPEEDS}
          onChange={(e) =>
            setSpeed(Number.parseFloat(e.target.value) as SpeedType)
          }
        />

        {/* Button at bottom of sidebar (landscape only) */}
        <div className="portrait:hidden">
          <PlayButton
            isDisabled={isDisabled}
            isGraphVisualized={isGraphVisualized}
            handlerRunVisualizer={handlerRunVisualizer}
          />
        </div>
      </div>

      {/* Button in row 1 right (portrait only, ml-auto pushes it right) */}
      <div className="portrait:order-2 portrait:ml-auto landscape:hidden">
        <PlayButton
          isDisabled={isDisabled}
          isGraphVisualized={isGraphVisualized}
          handlerRunVisualizer={handlerRunVisualizer}
        />
      </div>
    </div>
  );
}
