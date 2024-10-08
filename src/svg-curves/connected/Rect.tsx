import React from "react";
import { EmbedRect as UnconnectedEmbedRect } from "../components/embed/EmbedRect.tsx";
import { type Delta } from "../utils/types.ts";

import { store } from "../state/store";
import { Provider } from "react-redux";
import type { RootState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import { setCoordinate, setWidth, setHeight } from "../state/features/rect.ts";

interface RectProps {
  fullScreen?: boolean;
}

export const RectWithoutProvider: React.FC<RectProps> = ({ fullScreen }) => {
  const state = useSelector((state: RootState) => state.rect);
  const style = useSelector((state: RootState) => state.style);
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
      style={style}
      fullScreen={fullScreen}
    />
  );
};

export const Rect: React.FC<RectProps> = ({ fullScreen }) => (
  <Provider store={store}>
    <RectWithoutProvider fullScreen={fullScreen} />
  </Provider>
);
