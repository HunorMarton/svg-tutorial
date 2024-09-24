import React, { useEffect } from "react";
import { EmbedArc as UnconnectedEmbedArc } from "../components/EmbedArc.tsx";
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
} from "../state/features/arc";

interface ArcProps {
  fullScreen?: boolean;
}

export const ArcWithoutProvider: React.FC<ArcProps> = ({ fullScreen }) => {
  const state = useSelector((state: RootState) => state.arc);
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

  useEffect(() => {
    // Set initial arc
    setArcStartPoint({ dx: 0, dy: 0 });
  }, []);

  return (
    <UnconnectedEmbedArc
      {...state}
      setArcStartPoint={setArcStartPoint}
      setArcEndPoint={setArcEndPoint}
      setArcRadiusX={setArcRadiusX}
      setArcRadiusY={setArcRadiusY}
      setArcRotation={setArcRotation}
      setArcFlags={setArcFlags}
      fullScreen={fullScreen}
    />
  );
};

export const Arc: React.FC<ArcProps> = ({ fullScreen }) => (
  <Provider store={store}>
    <ArcWithoutProvider fullScreen={fullScreen} />
  </Provider>
);
