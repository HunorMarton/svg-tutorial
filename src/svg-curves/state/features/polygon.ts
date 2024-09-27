import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Polygon, type Delta } from "../../utils/types";
import { resize } from "./canvas";
import { set } from "./style";
import * as viewBoxMin from "../../constants/viewBoxSize";
import { overrideX, overrideY } from "../../utils/overrideCoord";

const initialState: Polygon = {
  points: [
    { x: 100, y: 360 },
    { x: 100, y: 200 },
    { x: 225, y: 80 },
    { x: 350, y: 200 },
    { x: 350, y: 360 },
  ],
};

const viewBox = {
  width: viewBoxMin.WIDTH,
  height: viewBoxMin.HEIGHT,
};

export const polygonSlice = createSlice({
  name: "polygon",
  initialState,
  reducers: {
    setPoint: (
      state,
      action: PayloadAction<{ index: number; delta: Delta }>
    ) => {
      const { index, delta } = action.payload;
      state.points[index].x = overrideX(
        state.points[index].x + delta.dx,
        viewBox.width
      );
      state.points[index].y = overrideY(
        state.points[index].y + delta.dy,
        viewBox.height
      );
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
        if (feature === "polygon") Object.assign(state, values);
      });
  },
});

// Action creators are generated for each case reducer function
export const { setPoint } = polygonSlice.actions;

export default polygonSlice.reducer;
