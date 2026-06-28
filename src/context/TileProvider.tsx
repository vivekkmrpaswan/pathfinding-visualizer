// TileProvider.tsx
import { ReactNode, useEffect, useMemo, useState } from "react";
import { TileType } from "../utils/types";
import { createStartTile, createEndTile } from "../utils/constants";
import { TileContext } from "./TileContext";
import { usePathfinding } from "../hooks/usePathfinding";

export const TileProvider = ({ children }: { children: ReactNode }) => {
  const { rows, cols } = usePathfinding();

  const [startTile, setStartTile] = useState<TileType>(createStartTile());

  const [endTile, setEndTile] = useState<TileType>(createEndTile(rows, cols));

  useEffect(() => {
    setStartTile(createStartTile());
    setEndTile(createEndTile(rows, cols));
  }, [rows, cols]);

  const value = useMemo(
    () => ({ startTile, setStartTile, endTile, setEndTile }),
    [startTile, endTile],
  );

  return <TileContext.Provider value={value}>{children}</TileContext.Provider>;
};
