import { useEffect, useState } from "react";

export function useGridDimensions() {
  const [dimensions, setDimensions] = useState({
    rows: 39,
    cols: 49,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const isPortrait = window.innerHeight > window.innerWidth;

      // Mobile
      if (window.innerWidth < 640) {
        setDimensions(
          isPortrait
            ? {
                rows: 43,
                cols: 27,
              }
            : {
                rows: 27,
                cols: 43,
              },
        );
      }
      // Tablet
      else if (window.innerWidth < 1024) {
        setDimensions(
          isPortrait
            ? {
                rows: 47,
                cols: 39,
              }
            : {
                rows: 39,
                cols: 55,
              },
        );
      }
      // Desktop
      else {
        setDimensions({
          rows: 39,
          cols: 49,
        });
      }
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return dimensions;
}
