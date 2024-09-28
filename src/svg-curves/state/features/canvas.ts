import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Canvas, type Size } from "../../utils/types";
import * as viewBoxMin from "../../constants/viewBoxSize";

const initialState: Canvas = {
  zoom: 1, // Changes if screen size goes below mainViewBox size
  svgWidth: viewBoxMin.WIDTH, // Shrinks if the screen size goes below mainViewBox size
  svgHeight: viewBoxMin.HEIGHT,
  viewBoxWidth: undefined, // When the available space if more than 450px it is undefined and takes up the available space; otherwise stays 450px as a minimum (shrinking the content)
  viewBoxHeight: undefined,
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

      // Edge case when navigating to page. For some reason the ResizeObserver fires with 0 width and height. Might be connected to viewTransition. Ignoring because it also triggers a hydration error.
      if (availableSize.width === 0 && availableSize.height === 0) return;

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
        state.viewBoxWidth = viewBoxMin.WIDTH;
        state.viewBoxHeight = viewBoxMin.HEIGHT;
      } else {
        state.zoom = 1;
        state.svgWidth = viewBoxMin.WIDTH;
        state.svgHeight = viewBoxMin.HEIGHT;
        state.viewBoxWidth = undefined;
        state.viewBoxHeight = undefined;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { resize } = canvasSlice.actions;

export default canvasSlice.reducer;
