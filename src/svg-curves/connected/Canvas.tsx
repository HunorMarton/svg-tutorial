import React, { type ReactNode, useCallback } from "react";
import { Canvas as UnconnectedCanvas } from "../components/Canvas.tsx";
import { useAppContext } from "../state/context.tsx";
import { RESIZE } from "../constants/actions.ts";

export const Canvas: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state, dispatch } = useAppContext();

  const resize = useCallback(
    ({ width, height }: { width: number; height: number }) => {
      dispatch({ type: RESIZE, payload: { width, height } });
    },
    [dispatch]
  );

  return (
    <UnconnectedCanvas
      viewBoxWidth={state.canvas.viewBoxWidth}
      viewBoxHeight={state.canvas.viewBoxHeight}
      resize={resize}
    >
      {children}
    </UnconnectedCanvas>
  );
};
