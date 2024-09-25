import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Line, type Delta } from "../../../utils/types";
import { resize } from "../canvas";
import * as viewBoxMin from "../../../constants/viewBoxSize";
import { overrideX, overrideY } from "../../../utils/overrideCoord";

const initialState: Line = {
  x1: 100,
  y1: 100,
  x2: 350,
  y2: 350,
};

const viewBox = {
  width: viewBoxMin.WIDTH,
  height: viewBoxMin.HEIGHT,
};

export const lineSlice = createSlice({
  name: "line",
  initialState,
  reducers: {
    setCoordinate1: (state, action: PayloadAction<Delta>) => {
      state.x1 = overrideX(state.x1 + action.payload.dx, viewBox.width);
      state.y1 = overrideY(state.y1 + action.payload.dy, viewBox.height);
    },
    setCoordinate2: (state, action: PayloadAction<Delta>) => {
      state.x2 = overrideX(state.x2 + action.payload.dx, viewBox.width);
      state.y2 = overrideY(state.y2 + action.payload.dy, viewBox.height);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resize, (state, action) => {
      viewBox.width = Math.max(action.payload.width, viewBoxMin.WIDTH);
      viewBox.height = Math.max(action.payload.height, viewBoxMin.HEIGHT);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setCoordinate1, setCoordinate2 } = lineSlice.actions;

export default lineSlice.reducer;
