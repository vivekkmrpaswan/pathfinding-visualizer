import { PathfindingProvider } from "./context/PathfindingProvider";
import { TileProvider } from "./context/TileProvider";
import { SpeedProvider } from "./context/SpeedProvider";
import { Grid } from "./components/Grid";
import { useRef } from "react";
import { Nav } from "./components/Nav";

function App() {
  const isVisualizationRunningRef = useRef(false);

  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
          <div className="h-svh w-svw flex">
            <Nav isVisualizationRunningRef={isVisualizationRunningRef} />
            <div className="flex-1 flex items-center justify-center pb-7 overflow-auto">
              <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
            </div>
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>
  );
}

export default App;
