import React, { type ReactNode } from "react";
import { Code as UnconnectedCode } from "../components/Code.tsx";

import type { RootState } from "../state/store";
import { useSelector } from "react-redux";

export const Code: React.FC<{ children: ReactNode }> = ({ children }) => {
  const canvas = useSelector((state: RootState) => state.canvas);

  return (
    <UnconnectedCode width={canvas.svgWidth} height={canvas.svgHeight}>
      {children}
    </UnconnectedCode>
  );
};
