import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type CubicBezier, type Delta } from "../../../utils/types";
import { resize } from "../canvas";
import * as viewBoxMin from "../../../constants/viewBoxSize";
import overrideCoord from "../../../utils/overrideCoord";

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
      const { x, y } = overrideCoord({
        x: state.x0 + action.payload.dx,
        y: state.y0 + action.payload.dy,
        width: viewBox.width,
        height: viewBox.height,
      });
      state.x0 = x;
      state.y0 = y;
    },
    setControlPoint1: (state, action: PayloadAction<Delta>) => {
      const { x, y } = overrideCoord({
        x: state.x1 + action.payload.dx,
        y: state.y1 + action.payload.dy,
        width: viewBox.width,
        height: viewBox.height,
      });
      state.x1 = x;
      state.y1 = y;
    },
    setControlPoint2: (state, action: PayloadAction<Delta>) => {
      const { x, y } = overrideCoord({
        x: state.x2 + action.payload.dx,
        y: state.y2 + action.payload.dy,
        width: viewBox.width,
        height: viewBox.height,
      });
      state.x2 = x;
      state.y2 = y;
    },
    setEndPoint: (state, action: PayloadAction<Delta>) => {
      const { x, y } = overrideCoord({
        x: state.x + action.payload.dx,
        y: state.y + action.payload.dy,
        width: viewBox.width,
        height: viewBox.height,
      });
      state.x = x;
      state.y = y;
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
