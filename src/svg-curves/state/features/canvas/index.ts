import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Canvas, type Size } from "../../../utils/types";
import * as viewBoxMin from "../../../constants/viewBoxSize";

const initialState: Canvas = {
  zoom: 1, // Changes if screen size goes below mainViewBox size
  svgWidth: viewBoxMin.WIDTH, // Shrinks if the screen size goes below mainViewBox size
  svgHeight: viewBoxMin.HEIGHT,
  viewBoxWidth: viewBoxMin.WIDTH, // Grows if the screen size goes above mainViewBox size
  viewBoxHeight: viewBoxMin.HEIGHT,
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

      if (
        availableSize.width < viewBoxMin.WIDTH ||
        availableSize.height < viewBoxMin.HEIGHT
      ) {
        // Shrink everything if needed
        state.zoom =
          availableSize.width < availableSize.height
            ? availableSize.width / viewBoxMin.WIDTH
            : availableSize.height / viewBoxMin.HEIGHT;
        state.svgWidth = Math.min(availableSize.width, availableSize.height);
        state.svgHeight = Math.min(availableSize.width, availableSize.height);
      } else {
        state.zoom = 1;
        state.svgWidth = viewBoxMin.WIDTH;
        state.svgHeight = viewBoxMin.HEIGHT;
      }

      state.viewBoxWidth = Math.max(availableSize.width, viewBoxMin.WIDTH);
      state.viewBoxHeight = Math.max(availableSize.height, viewBoxMin.HEIGHT);
    },
  },
});

// Action creators are generated for each case reducer function
export const { resize } = canvasSlice.actions;

export default canvasSlice.reducer;
