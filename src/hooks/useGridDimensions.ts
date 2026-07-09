import { useState } from "react";

// Returns a best-guess initial dimension estimate based on viewport size.
// This is used only for the first render. Grid.tsx's ResizeObserver then
// measures actual available container space and calls setDimensions() to
// refine, so the grid precisely fills whatever pixels are available.
export function useGridDimensions() {
  const [dimensions] = useState(() => {
    const isPortrait = window.innerHeight > window.innerWidth;

    if (window.innerWidth < 640) {
      return isPortrait ? { rows: 43, cols: 27 } : { rows: 27, cols: 43 };
    }

    if (window.innerWidth < 1024) {
      return isPortrait ? { rows: 47, cols: 39 } : { rows: 39, cols: 55 };
    }

    return { rows: 39, cols: 49 };
  });

  return dimensions;
}
