import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import { type Delta } from "../utils/types";
import { Drag as UnconnectedDrag } from "../components/Drag.tsx";

interface DragProps {
  id?: string;
  children: React.ReactNode;
  x: number;
  y: number;
  moveCoord: (coord: Delta) => void;
  desc?: string;
}
export const Drag: React.FC<DragProps> = (props) => {
  const zoom = useSelector((state: RootState) => state.canvas.zoom);

  const moveCoord = useCallback(
    ({ dx, dy }: Delta) => props.moveCoord({ dx: dx / zoom, dy: dy / zoom }),
    [zoom]
  );

  return <UnconnectedDrag {...props} moveCoord={moveCoord} />;
};
