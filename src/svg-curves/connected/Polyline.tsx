import React from "react";
import { EmbedPolyline as UnconnectedEmbedPolyline } from "../components/embed/EmbedPolyline.tsx";
import { type Delta } from "../utils/types.ts";

import { store } from "../state/store";
import { Provider } from "react-redux";
import type { RootState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import { setPoint } from "../state/features/polyline.ts";

interface PolylineProps {
  fullScreen?: boolean;
}

export const PolylineWithoutProvider: React.FC<PolylineProps> = ({
  fullScreen,
}) => {
  const state = useSelector((state: RootState) => state.polyline);
  const style = useSelector((state: RootState) => state.style);
  const dispatch = useDispatch();

  const setPolylinePoint = (index: number, delta: Delta) =>
    dispatch(setPoint({ index, delta }));

  return (
    <UnconnectedEmbedPolyline
      {...state}
      setPolylinePoint={setPolylinePoint}
      style={style}
      fullScreen={fullScreen}
    />
  );
};

export const Polyline: React.FC<PolylineProps> = ({ fullScreen }) => (
  <Provider store={store}>
    <PolylineWithoutProvider fullScreen={fullScreen} />
  </Provider>
);
