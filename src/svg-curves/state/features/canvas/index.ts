import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Canvas, type Size } from "../../../utils/types";
import * as viewBoxMin from "../../../constants/viewBoxSize";

const initialState: Canvas = {
  zoom: 1, // Changes if screen size goes below mainViewBox size
  svgWidth: 500, // Moves with resize
  svgHeight: 500,
  viewBoxWidth: 500, // Grows if the screen size goes above mainViewBox size
  viewBoxHeight: 500,
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    resize: (state, action: PayloadAction<Size>) => {
      const availableSize = {
        width: action.payload.width,
        height: action.payload.height,
      };

      // Shrink everything if needed
      let zoom: number = 1;
      if (
        availableSize.width < viewBoxMin.WIDTH ||
        availableSize.height < viewBoxMin.HEIGHT
      ) {
        zoom =
          availableSize.width < availableSize.height
            ? availableSize.width / viewBoxMin.WIDTH
            : availableSize.height / viewBoxMin.HEIGHT;
      }

      state.zoom = zoom;
      state.svgWidth = availableSize.width;
      state.svgHeight = availableSize.height;
      state.viewBoxWidth = Math.max(availableSize.width, viewBoxMin.WIDTH);
      state.viewBoxHeight = Math.max(availableSize.height, viewBoxMin.HEIGHT);
    },
  },
});

// Action creators are generated for each case reducer function
export const { resize } = canvasSlice.actions;

export default canvasSlice.reducer;
