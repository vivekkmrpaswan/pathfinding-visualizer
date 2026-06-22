import { useEffect, useState } from "react";

export function useGridDimensions() {
  const [dimensions, setDimensions] = useState({
    rows: 39,
    cols: 49,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth < 640) {
        setDimensions({
          rows: 21,
          cols: 25,
        });
      } else if (window.innerWidth < 1024) {
        setDimensions({
          rows: 31,
          cols: 39,
        });
      } else {
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
