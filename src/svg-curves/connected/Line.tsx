import React from "react";
import { EmbedLine as UnconnectedEmbedLine } from "../components/EmbedLine.tsx";
import { type Delta } from "../utils/types.ts";

import { store } from "../state/store";
import { Provider } from "react-redux";
import type { RootState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setCoordinate1,
  setCoordinate2,
} from "../state/features/line-element/index.ts";

interface LineProps {
  fullScreen?: boolean;
}

export const LineWithoutProvider: React.FC<LineProps> = ({ fullScreen }) => {
  const state = useSelector((state: RootState) => state.line);
  const dispatch = useDispatch();

  const setLineCoordinate1 = (delta: Delta) => dispatch(setCoordinate1(delta));
  const setLineCoordinate2 = (delta: Delta) => dispatch(setCoordinate2(delta));

  return (
    <UnconnectedEmbedLine
      {...state}
      setLineCoordinate1={setLineCoordinate1}
      setLineCoordinate2={setLineCoordinate2}
      fullScreen={fullScreen}
    />
  );
};

export const Line: React.FC<LineProps> = ({ fullScreen }) => (
  <Provider store={store}>
    <LineWithoutProvider fullScreen={fullScreen} />
  </Provider>
);
