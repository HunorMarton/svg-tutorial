import React, { useCallback } from "react";
import { AppProvider, useAppContext } from "../state/context.tsx";
import { EmbedCubicBezier as UnconnectedEmbedCubicBezier } from "../components/EmbedCubicBezier.tsx";
import { type Coordinate } from "../utils/types.ts";
import {
  CUBIC_BEZIER_START_POINT,
  CUBIC_BEZIER_CONTROL_POINT_1,
  CUBIC_BEZIER_CONTROL_POINT_2,
  CUBIC_BEZIER_END_POINT,
} from "../constants/actions.ts";

interface CubicBezierProps {
  fullScreen?: boolean;
}

export const CubicBezierWithoutProvider: React.FC<CubicBezierProps> = ({
  fullScreen,
}) => {
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
    <UnconnectedEmbedCubicBezier
      {...state.cubicBezier}
      setCubicBezierStartPoint={setCubicBezierStartPoint}
      setCubicBezierControlPoint1={setCubicBezierControlPoint1}
      setCubicBezierControlPoint2={setCubicBezierControlPoint2}
      setCubicBezierEndPoint={setCubicBezierEndPoint}
      fullScreen={fullScreen}
    />
  );
};

export const CubicBezier: React.FC<CubicBezierProps> = ({ fullScreen }) => (
  <AppProvider>
    <CubicBezierWithoutProvider fullScreen={fullScreen} />
  </AppProvider>
);
