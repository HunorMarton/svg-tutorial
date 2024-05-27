import React, { useCallback } from "react";
import { AppProvider, useAppContext } from "../state/context.tsx";
import { PageArc as UnconnectedPageArc } from "../components/PageArc.tsx";
import { type Coordinate } from "../utils/types.ts";
import {
  ARC_START_POINT,
  ARC_CENTER_POINT,
  ARC_END_POINT,
  ARC_RADIUS_X,
  ARC_RADIUS_Y,
  ARC_ROTATION,
  ARC_FLAGS,
} from "../constants/actions.ts";

export const ArcWithoutProvider: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const setArcStartPoint = useCallback(
    (coord: Coordinate) => dispatch({ type: ARC_START_POINT, payload: coord }),
    [dispatch]
  );

  const setArcCenterPoint = useCallback(
    (coord: Coordinate) => dispatch({ type: ARC_CENTER_POINT, payload: coord }),
    [dispatch]
  );

  const setArcEndPoint = useCallback(
    (coord: Coordinate) => dispatch({ type: ARC_END_POINT, payload: coord }),
    [dispatch]
  );

  const setArcRadiusX = useCallback(
    (coord: Coordinate) => dispatch({ type: ARC_RADIUS_X, payload: coord }),
    [dispatch]
  );

  const setArcRadiusY = useCallback(
    (coord: Coordinate) => dispatch({ type: ARC_RADIUS_Y, payload: coord }),
    [dispatch]
  );

  const setArcRotation = useCallback(
    (coord: Coordinate) => dispatch({ type: ARC_ROTATION, payload: coord }),
    [dispatch]
  );

  const setArcFlags = useCallback(
    ({
      largeArcFlag,
      sweepFlag,
    }: {
      largeArcFlag: boolean;
      sweepFlag: boolean;
    }) => dispatch({ type: ARC_FLAGS, payload: { largeArcFlag, sweepFlag } }),
    [dispatch]
  );

  return (
    <UnconnectedPageArc
      {...state.arc}
      setArcStartPoint={setArcStartPoint}
      setArcCenterPoint={setArcCenterPoint}
      setArcEndPoint={setArcEndPoint}
      setArcRadiusX={setArcRadiusX}
      setArcRadiusY={setArcRadiusY}
      setArcRotation={setArcRotation}
      setArcFlags={setArcFlags}
    />
  );
};

export const Arc: React.FC = () => (
  <AppProvider>
    <ArcWithoutProvider />
  </AppProvider>
);
