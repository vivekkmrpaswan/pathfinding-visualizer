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
          <div className="h-svh w-svw flex landscape:flex-row portrait:flex-col overflow-hidden">
            <Nav isVisualizationRunningRef={isVisualizationRunningRef} />
            <main className="flex-1 min-h-0 min-w-0 overflow-auto">
              <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
            </main>
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>
  );
}

export default App;
