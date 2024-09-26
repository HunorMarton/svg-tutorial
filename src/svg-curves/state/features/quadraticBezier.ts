import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type QuadraticBezier, type Delta } from "../../utils/types";
import { resize } from "./canvas";
import { set } from "./style";
import * as viewBoxMin from "../../constants/viewBoxSize";
import { overrideX, overrideY } from "../../utils/overrideCoord";

const initialState: QuadraticBezier = {
  x0: 100,
  y0: 350,
  x1: 225,
  y1: 50,
  x: 350,
  y: 350,
};

const viewBox = {
  width: viewBoxMin.WIDTH,
  height: viewBoxMin.HEIGHT,
};

export const quadraticBezierSlice = createSlice({
  name: "quadraticBezier",
  initialState,
  reducers: {
    setStartPoint: (state, action: PayloadAction<Delta>) => {
      state.x0 = overrideX(state.x0 + action.payload.dx, viewBox.width);
      state.y0 = overrideY(state.y0 + action.payload.dy, viewBox.height);
    },
    setControlPoint: (state, action: PayloadAction<Delta>) => {
      state.x1 = overrideX(state.x1 + action.payload.dx, viewBox.width);
      state.y1 = overrideY(state.y1 + action.payload.dy, viewBox.height);
    },
    setEndPoint: (state, action: PayloadAction<Delta>) => {
      state.x = overrideX(state.x + action.payload.dx, viewBox.width);
      state.y = overrideY(state.y + action.payload.dy, viewBox.height);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resize, (state, action) => {
        viewBox.width = Math.max(action.payload.width, viewBoxMin.WIDTH);
        viewBox.height = Math.max(action.payload.height, viewBoxMin.HEIGHT);
      })
      .addCase(set, (state, action) => {
        const { feature, values } = action.payload;
        if (feature === "quadraticBezier") Object.assign(state, values);
      });
  },
});

// Action creators are generated for each case reducer function
export const { setStartPoint, setControlPoint, setEndPoint } =
  quadraticBezierSlice.actions;

export default quadraticBezierSlice.reducer;
