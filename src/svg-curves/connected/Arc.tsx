import React from "react";
import { EmbedArc as UnconnectedEmbedArc } from "../components/embed/EmbedArc.tsx";
import { type Delta } from "../utils/types.ts";

import { store } from "../state/store";
import { Provider } from "react-redux";
import type { RootState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setStartPoint,
  setRotation,
  setRadiusX,
  setRadiusY,
  setFlags,
  setEndPoint,
} from "../state/features/arc.ts";

interface ArcProps {
  fullScreen?: boolean;
}

export const ArcWithoutProvider: React.FC<ArcProps> = ({ fullScreen }) => {
  const state = useSelector((state: RootState) => state.arc);
  const style = useSelector((state: RootState) => state.style);
  const dispatch = useDispatch();

  const setArcStartPoint = (delta: Delta) => dispatch(setStartPoint(delta));

  const setArcEndPoint = (delta: Delta) => dispatch(setEndPoint(delta));

  const setArcRadiusX = (delta: Delta) => dispatch(setRadiusX(delta));

  const setArcRadiusY = (delta: Delta) => dispatch(setRadiusY(delta));

  const setArcRotation = (delta: Delta) => dispatch(setRotation(delta));

  const setArcFlags = ({
    largeArcFlag,
    sweepFlag,
  }: {
    largeArcFlag: boolean;
    sweepFlag: boolean;
  }) => dispatch(setFlags({ largeArcFlag, sweepFlag }));

  return (
    <UnconnectedEmbedArc
      {...state}
      setArcStartPoint={setArcStartPoint}
      setArcEndPoint={setArcEndPoint}
      setArcRadiusX={setArcRadiusX}
      setArcRadiusY={setArcRadiusY}
      setArcRotation={setArcRotation}
      setArcFlags={setArcFlags}
      style={style}
      fullScreen={fullScreen}
    />
  );
};

export const Arc: React.FC<ArcProps> = ({ fullScreen }) => (
  <Provider store={store}>
    <ArcWithoutProvider fullScreen={fullScreen} />
  </Provider>
);
