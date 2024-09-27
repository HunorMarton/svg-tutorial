import React from "react";
import { EmbedPolygon as UnconnectedEmbedPolygon } from "../components/embed/EmbedPolygon.tsx";
import { type Delta } from "../utils/types.ts";

import { store } from "../state/store";
import { Provider } from "react-redux";
import type { RootState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import { setPoint } from "../state/features/polygon.ts";

interface PolygonProps {
  fullScreen?: boolean;
}

export const PolygonWithoutProvider: React.FC<PolygonProps> = ({
  fullScreen,
}) => {
  const state = useSelector((state: RootState) => state.polygon);
  const style = useSelector((state: RootState) => state.style);
  const dispatch = useDispatch();

  const setPolygonPoint = (index: number, delta: Delta) =>
    dispatch(setPoint({ index, delta }));

  return (
    <UnconnectedEmbedPolygon
      {...state}
      setPolygonPoint={setPolygonPoint}
      style={style}
      fullScreen={fullScreen}
    />
  );
};

export const Polygon: React.FC<PolygonProps> = ({ fullScreen }) => (
  <Provider store={store}>
    <PolygonWithoutProvider fullScreen={fullScreen} />
  </Provider>
);
