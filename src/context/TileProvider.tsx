// TileProvider.tsx
import { ReactNode, useMemo, useState } from "react";
import { TileType } from "../utils/types";
import {
  END_TILE_CONFIGURATION,
  START_TILE_CONFIGURATION,
} from "../utils/constants";
import { TileContext } from "./TileContext";

export const TileProvider = ({ children }: { children: ReactNode }) => {
  const [startTile, setStartTile] = useState<TileType>(
    START_TILE_CONFIGURATION,
  );
  const [endTile, setEndTile] = useState<TileType>(END_TILE_CONFIGURATION);

  const value = useMemo(
    () => ({ startTile, setStartTile, endTile, setEndTile }),
    [startTile, endTile],
  );

  return <TileContext.Provider value={value}>{children}</TileContext.Provider>;
};
