import React, { useCallback } from "react";
import { AppProvider, useAppContext } from "../state/context.tsx";
import { PageCubicBezier as UnconnectedPageCubicBezier } from "../components/PageCubicBezier.tsx";
import { type Coordinate } from "../utils/types.ts";
import {
  CUBIC_BEZIER_START_POINT,
  CUBIC_BEZIER_CONTROL_POINT_1,
  CUBIC_BEZIER_CONTROL_POINT_2,
  CUBIC_BEZIER_END_POINT,
} from "../constants/actions.ts";

export const CubicBezierWithoutProvider: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const setCubicBezierStartPoint = useCallback(
    (coord: Coordinate) =>
      dispatch({ type: CUBIC_BEZIER_START_POINT, payload: coord }),
    [dispatch]
  );

  const setCubicBezierControlPoint1 = useCallback(
    (coord: Coordinate) =>
      dispatch({ type: CUBIC_BEZIER_CONTROL_POINT_1, payload: coord }),
    [dispatch]
  );

  const setCubicBezierControlPoint2 = useCallback(
    (coord: Coordinate) =>
      dispatch({ type: CUBIC_BEZIER_CONTROL_POINT_2, payload: coord }),
    [dispatch]
  );

  const setCubicBezierEndPoint = useCallback(
    (coord: Coordinate) =>
      dispatch({ type: CUBIC_BEZIER_END_POINT, payload: coord }),
    [dispatch]
  );

  return (
    <UnconnectedPageCubicBezier
      {...state.cubicBezier}
      setCubicBezierStartPoint={setCubicBezierStartPoint}
      setCubicBezierControlPoint1={setCubicBezierControlPoint1}
      setCubicBezierControlPoint2={setCubicBezierControlPoint2}
      setCubicBezierEndPoint={setCubicBezierEndPoint}
    />
  );
};

export const CubicBezier: React.FC = () => (
  <AppProvider>
    <CubicBezierWithoutProvider />
  </AppProvider>
);
