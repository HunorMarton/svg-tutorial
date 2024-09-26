import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Style, type Generic } from "../../utils/types";

const initialState: Style = {
  stroke: "#fa3838", // Same as var(--curve-color)
  strokeWidth: 20,
  strokeLinecap: "butt",
  strokeLinejoin: "miter",
  fill: "none",
};

export const lineSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Generic>) => {
      const { feature, values } = action.payload;
      if (feature === "style") Object.assign(state, values);
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const { set, reset } = lineSlice.actions;

export default lineSlice.reducer;
