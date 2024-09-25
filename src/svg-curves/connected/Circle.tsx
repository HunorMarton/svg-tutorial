import React from "react";
import { EmbedCircle as UnconnectedEmbedCircle } from "../components/EmbedCircle.tsx";
import { type Delta } from "../utils/types.ts";

import { store } from "../state/store";
import { Provider } from "react-redux";
import type { RootState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import { setCoordinate, setRadius } from "../state/features/circle.ts";

interface CircleProps {
  fullScreen?: boolean;
}

export const CircleWithoutProvider: React.FC<CircleProps> = ({
  fullScreen,
}) => {
  const state = useSelector((state: RootState) => state.circle);
  const dispatch = useDispatch();

  const setCircleCoordinate = (delta: Delta) => dispatch(setCoordinate(delta));
  const setCircleRadius = (delta: Delta) => dispatch(setRadius(delta));

  return (
    <UnconnectedEmbedCircle
      {...state}
      setCircleCoordinate={setCircleCoordinate}
      setCircleRadius={setCircleRadius}
      fullScreen={fullScreen}
    />
  );
};

export const Circle: React.FC<CircleProps> = ({ fullScreen }) => (
  <Provider store={store}>
    <CircleWithoutProvider fullScreen={fullScreen} />
  </Provider>
);
