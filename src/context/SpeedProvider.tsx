import { ReactNode, useMemo, useState } from "react";
import { SpeedType } from "../utils/types";
import { SpeedContext } from "./SpeedContext";

export const SpeedProvider = ({ children }: { children: ReactNode }) => {
  const [speed, setSpeed] = useState<SpeedType>(0.5);
  const value = useMemo(() => ({ speed, setSpeed }), [speed]);

  return (
    <SpeedContext.Provider value={value}>{children}</SpeedContext.Provider>
  );
};
