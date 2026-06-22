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
    runMazeAlgorithm({
      maze,
      grid,
      startTile,
      endTile,
      setIsDisabled,
      speed,
    });

    const newGrid = grid.slice();
    setGrid(newGrid);
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
      const newGrid = grid.slice();
      setGrid(newGrid);

      setTimeout(() => {
        setIsGraphVisualized(true);
        setIsDisabled(false);
        isVisualizationRunningRef.current = false;
      }, RESET_BUTTON_DELAY);
    });
  };

  return (
    <div className="flex shrink-0 shadow-gray-600 landscape:flex-col landscape:items-start landscape:h-screen landscape:w-64 landscape:border-r landscape:px-5 landscape:py-8 landscape:overflow-y-auto portrait:flex-row portrait:items-center portrait:w-full portrait:border-t portrait:px-4 portrait:py-3 portrait:overflow-x-auto portrait:gap-3">
      <div className="flex items-center gap-2 landscape:w-full landscape:mb-8 portrait:w-auto">
        <img
          src="/pathfinding-visualizer.png"
          alt="pathfinding visualizer"
          className="w-8 h-8 portrait:w-12 portrait:h-12"
        />
        <h1 className="font-bold leading-tight text-start landscape:block portrait:hidden">
          Pathfinding <span className="text-amber-400">Visualizer</span>
        </h1>
      </div>
      <div className="flex landscape:flex-col landscape:space-y-5 landscape:w-full portrait:flex-row portrait:flex-1 portrait:items-center portrait:gap-3">
        <Select
          label="maze"
          value={maze}
          options={MAZES}
          onChange={(e) => {
            handleGenerateMaze(e.target.value as MazeType);
          }}
        />
        <Select
          label="Graph"
          value={algorithm}
          options={PATHFINDING_ALGORITHMS}
          onChange={(e) => {
            setAlgorithm(e.target.value as AlgorithmType);
          }}
        />
        <Select
          label="Speed"
          value={speed}
          options={SPEEDS}
          onChange={(e) => {
            setSpeed(Number.parseFloat(e.target.value) as SpeedType);
          }}
        />
        <PlayButton
          isDisabled={isDisabled}
          isGraphVisualized={isGraphVisualized}
          handlerRunVisualizer={handlerRunVisualizer}
        />
      </div>
    </div>
  );
}
