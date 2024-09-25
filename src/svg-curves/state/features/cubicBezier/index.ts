import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type CubicBezier, type Delta } from "../../../utils/types";
import { resize } from "../canvas";
import * as viewBoxMin from "../../../constants/viewBoxSize";
import { overrideX, overrideY } from "../../../utils/overrideCoord";

const initialState: CubicBezier = {
  x0: 100,
  y0: 350,
  x1: 70,
  y1: 100,
  x2: 380,
  y2: 100,
  x: 350,
  y: 350,
};

const viewBox = {
  width: 500,
  height: 500,
};

export const cubicBezierSlice = createSlice({
  name: "cubicBezier",
  initialState,
  reducers: {
    setStartPoint: (state, action: PayloadAction<Delta>) => {
      state.x0 = overrideX(state.x0 + action.payload.dx, viewBox.width);
      state.y0 = overrideY(state.y0 + action.payload.dy, viewBox.height);
    },
    setControlPoint1: (state, action: PayloadAction<Delta>) => {
      state.x1 = overrideX(state.x1 + action.payload.dx, viewBox.width);
      state.y1 = overrideY(state.y1 + action.payload.dy, viewBox.height);
    },
    setControlPoint2: (state, action: PayloadAction<Delta>) => {
      state.x2 = overrideX(state.x2 + action.payload.dx, viewBox.width);
      state.y2 = overrideY(state.y2 + action.payload.dy, viewBox.height);
    },
    setEndPoint: (state, action: PayloadAction<Delta>) => {
      state.x = overrideX(state.x + action.payload.dx, viewBox.width);
      state.y = overrideY(state.y + action.payload.dy, viewBox.height);
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
export const {
  setStartPoint,
  setControlPoint1,
  setControlPoint2,
  setEndPoint,
} = cubicBezierSlice.actions;

export default cubicBezierSlice.reducer;
