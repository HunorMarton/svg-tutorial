import React from "react";
import { EmbedRect as UnconnectedEmbedRect } from "../components/EmbedRect.tsx";
import { type Delta } from "../utils/types.ts";

import { store } from "../state/store";
import { Provider } from "react-redux";
import type { RootState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import { setCoordinate, setWidth, setHeight } from "../state/features/rect";

interface RectProps {
  fullScreen?: boolean;
}

export const RectWithoutProvider: React.FC<RectProps> = ({ fullScreen }) => {
  const state = useSelector((state: RootState) => state.rect);
  const dispatch = useDispatch();

  const setRectCoordinate = (delta: Delta) => dispatch(setCoordinate(delta));
  const setRectWidth = (delta: Delta) => dispatch(setWidth(delta));
  const setRectHeight = (delta: Delta) => dispatch(setHeight(delta));

  return (
    <UnconnectedEmbedRect
      {...state}
      setRectCoordinate={setRectCoordinate}
      setRectWidth={setRectWidth}
      setRectHeight={setRectHeight}
      fullScreen={fullScreen}
    />
  );
};

export const Rect: React.FC<RectProps> = ({ fullScreen }) => (
  <Provider store={store}>
    <RectWithoutProvider fullScreen={fullScreen} />
  </Provider>
);
