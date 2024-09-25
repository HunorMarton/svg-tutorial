import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Rect, type Delta } from "../../../utils/types";
import { resize } from "../canvas";
import * as viewBoxMin from "../../../constants/viewBoxSize";
import { overrideX, overrideY } from "../../../utils/overrideCoord";

const initialState: Rect = {
  x: 75,
  y: 125,
  width: 300,
  height: 200,
};

const viewBox = {
  width: viewBoxMin.WIDTH,
  height: viewBoxMin.HEIGHT,
};

export const rectSlice = createSlice({
  name: "rect",
  initialState,
  reducers: {
    setCoordinate: (state, action: PayloadAction<Delta>) => {
      state.x = overrideX(state.x + action.payload.dx, viewBox.width);
      state.y = overrideY(state.y + action.payload.dy, viewBox.height);
    },
    setWidth: (state, action: PayloadAction<Delta>) => {
      state.width = overrideX(state.width + action.payload.dx, viewBox.width);
    },
    setHeight: (state, action: PayloadAction<Delta>) => {
      state.height = overrideY(
        state.height + action.payload.dy,
        viewBox.height
      );
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
export const { setCoordinate, setWidth, setHeight } = rectSlice.actions;

export default rectSlice.reducer;
