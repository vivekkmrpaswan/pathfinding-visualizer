import { usePathfinding } from "../hooks/usePathfinding";
import { Select } from "./Select";
import { MAZES, PATHFINDING_ALGORITHMS, SPEEDS } from "../utils/constants";
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
      setIsGraphVisualized(true);
      setIsDisabled(false);
      isVisualizationRunningRef.current = false;
    });
  };

  return (
    <div className="flex flex-col items-start h-screen w-64 shrink-0 border-r shadow-gray-600 px-5 py-8 overflow-y-auto">
      <h1 className="text-xl text-center mb-8">Pathfinding Visualizer</h1>
      <div className="flex flex-col space-y-5 w-full">
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
            setSpeed(Number.parseInt(e.target.value) as SpeedType);
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
