import React, { useCallback } from "react";
import { AppProvider, useAppContext } from "../state/context.tsx";
import { EmbedQuadraticBezier as UnconnectedEmbedQuadraticBezier } from "../components/EmbedQuadraticBezier.tsx";
import { type Coordinate } from "../utils/types.ts";
import {
  QUADRATIC_BEZIER_START_POINT,
  QUADRATIC_BEZIER_CONTROL_POINT,
  QUADRATIC_BEZIER_END_POINT,
} from "../constants/actions.ts";

interface QuadraticBezierProps {
  fullScreen?: boolean;
}

export const QuadraticBezierWithoutProvider: React.FC<QuadraticBezierProps> = ({
  fullScreen,
}) => {
  const { state, dispatch } = useAppContext();

  const setQuadraticBezierStartPoint = useCallback(
    (coord: Coordinate) =>
      dispatch({ type: QUADRATIC_BEZIER_START_POINT, payload: coord }),
    [dispatch]
  );

  const setQuadraticBezierControlPoint1 = useCallback(
    (coord: Coordinate) =>
      dispatch({ type: QUADRATIC_BEZIER_CONTROL_POINT, payload: coord }),
    [dispatch]
  );

  const setQuadraticBezierEndPoint = useCallback(
    (coord: Coordinate) =>
      dispatch({ type: QUADRATIC_BEZIER_END_POINT, payload: coord }),
    [dispatch]
  );

  return (
    <UnconnectedEmbedQuadraticBezier
      {...state.quadraticBezier}
      setQuadraticBezierStartPoint={setQuadraticBezierStartPoint}
      setQuadraticBezierControlPoint1={setQuadraticBezierControlPoint1}
      setQuadraticBezierEndPoint={setQuadraticBezierEndPoint}
      fullScreen={fullScreen}
    />
  );
};

export const QuadraticBezier: React.FC<QuadraticBezierProps> = ({
  fullScreen,
}) => (
  <AppProvider>
    <QuadraticBezierWithoutProvider fullScreen={fullScreen} />
  </AppProvider>
);
