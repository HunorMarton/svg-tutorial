import React from "react";
import { EmbedCubicBezier as UnconnectedEmbedCubicBezier } from "../components/EmbedCubicBezier.tsx";
import { type Delta } from "../utils/types.ts";

import { store } from "../state/store";
import { Provider } from "react-redux";
import type { RootState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setStartPoint,
  setControlPoint1,
  setControlPoint2,
  setEndPoint,
} from "../state/features/cubicBezier.ts";

interface CubicBezierProps {
  fullScreen?: boolean;
}

export const CubicBezierWithoutProvider: React.FC<CubicBezierProps> = ({
  fullScreen,
}) => {
  const state = useSelector((state: RootState) => state.cubicBezier);
  const style = useSelector((state: RootState) => state.style);
  const dispatch = useDispatch();

  const setCubicBezierStartPoint = (delta: Delta) =>
    dispatch(setStartPoint(delta));

  const setCubicBezierControlPoint1 = (delta: Delta) =>
    dispatch(setControlPoint1(delta));

  const setCubicBezierControlPoint2 = (delta: Delta) =>
    dispatch(setControlPoint2(delta));

  const setCubicBezierEndPoint = (delta: Delta) => dispatch(setEndPoint(delta));

  return (
    <UnconnectedEmbedCubicBezier
      {...state}
      setCubicBezierStartPoint={setCubicBezierStartPoint}
      setCubicBezierControlPoint1={setCubicBezierControlPoint1}
      setCubicBezierControlPoint2={setCubicBezierControlPoint2}
      setCubicBezierEndPoint={setCubicBezierEndPoint}
      style={style}
      fullScreen={fullScreen}
    />
  );
};

export const CubicBezier: React.FC<CubicBezierProps> = ({ fullScreen }) => (
  <Provider store={store}>
    <CubicBezierWithoutProvider fullScreen={fullScreen} />
  </Provider>
);
