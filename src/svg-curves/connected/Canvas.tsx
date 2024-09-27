import React, { type ReactNode, useCallback } from "react";
import { type Size } from "../utils/types";
import { Canvas as UnconnectedCanvas } from "../components/canvas/Canvas.tsx";

import type { RootState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import { resize as resizeCanvas } from "../state/features/canvas.ts";

export const Canvas: React.FC<{ children: ReactNode }> = ({ children }) => {
  const canvas = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();

  const resize = useCallback((size: Size) => dispatch(resizeCanvas(size)), []);

  return (
    <UnconnectedCanvas
      viewBoxWidth={canvas.viewBoxWidth}
      viewBoxHeight={canvas.viewBoxHeight}
      resize={resize}
    >
      {children}
    </UnconnectedCanvas>
  );
};
