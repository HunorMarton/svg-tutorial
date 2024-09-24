import React from "react";
import { EmbedQuadraticBezier as UnconnectedEmbedQuadraticBezier } from "../components/EmbedQuadraticBezier.tsx";
import { type Delta } from "../utils/types.ts";

import { store } from "../state/store";
import { Provider } from "react-redux";
import type { RootState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setStartPoint,
  setControlPoint,
  setEndPoint,
} from "../state/features/quadraticBezier";

interface QuadraticBezierProps {
  fullScreen?: boolean;
}

export const QuadraticBezierWithoutProvider: React.FC<QuadraticBezierProps> = ({
  fullScreen,
}) => {
  const state = useSelector((state: RootState) => state.quadraticBezier);
  const dispatch = useDispatch();

  const setQuadraticBezierStartPoint = (delta: Delta) =>
    dispatch(setStartPoint(delta));

  const setQuadraticBezierControlPoint1 = (delta: Delta) =>
    dispatch(setControlPoint(delta));

  const setQuadraticBezierEndPoint = (delta: Delta) =>
    dispatch(setEndPoint(delta));

  return (
    <UnconnectedEmbedQuadraticBezier
      {...state}
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
  <Provider store={store}>
    <QuadraticBezierWithoutProvider fullScreen={fullScreen} />
  </Provider>
);
