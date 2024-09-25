import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Circle, type Delta } from "../../utils/types";
import { resize } from "./canvas";
import * as viewBoxMin from "../../constants/viewBoxSize";
import { overrideX, overrideY } from "../../utils/overrideCoord";

const initialState: Circle = {
  cx: 225,
  cy: 225,
  r: 150,
};

const viewBox = {
  width: viewBoxMin.WIDTH,
  height: viewBoxMin.HEIGHT,
};

export const circleSlice = createSlice({
  name: "circle",
  initialState,
  reducers: {
    setCoordinate: (state, action: PayloadAction<Delta>) => {
      state.cx = overrideX(state.cx + action.payload.dx, viewBox.width);
      state.cy = overrideY(state.cy + action.payload.dy, viewBox.height);
    },
    setRadius: (state, action: PayloadAction<Delta>) => {
      state.r = overrideX(state.r + action.payload.dx, viewBox.width);
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
export const { setCoordinate, setRadius } = circleSlice.actions;

export default circleSlice.reducer;
