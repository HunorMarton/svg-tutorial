import React from "react";
import { EmbedText as UnconnectedEmbedText } from "../components/EmbedText.tsx";
import { type Delta } from "../utils/types.ts";

import { store } from "../state/store";
import { Provider } from "react-redux";
import type { RootState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import { setCoordinate } from "../state/features/text.ts";

interface TextProps {
  fullScreen?: boolean;
}

export const TextWithoutProvider: React.FC<TextProps> = ({ fullScreen }) => {
  const state = useSelector((state: RootState) => state.text);
  const style = useSelector((state: RootState) => state.style);
  const dispatch = useDispatch();

  const setTextCoordinate = (delta: Delta) => dispatch(setCoordinate(delta));

  return (
    <UnconnectedEmbedText
      {...state}
      setTextCoordinate={setTextCoordinate}
      style={style}
      fullScreen={fullScreen}
    />
  );
};

export const Text: React.FC<TextProps> = ({ fullScreen }) => (
  <Provider store={store}>
    <TextWithoutProvider fullScreen={fullScreen} />
  </Provider>
);
