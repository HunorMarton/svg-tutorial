import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Text, type Delta } from "../../utils/types";
import { resize } from "./canvas";
import { set } from "./style";
import * as viewBoxMin from "../../constants/viewBoxSize";
import { overrideX, overrideY } from "../../utils/overrideCoord";

const initialState: Text = {
  x: 120,
  y: 350,
  text: "S",
  fontFamily: "Arial",
  fontSize: 350,
  textAnchor: "start",
};

const viewBox = {
  width: viewBoxMin.WIDTH,
  height: viewBoxMin.HEIGHT,
};

export const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    setCoordinate: (state, action: PayloadAction<Delta>) => {
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
        if (feature === "text") Object.assign(state, values);
      });
  },
});

// Action creators are generated for each case reducer function
export const { setCoordinate } = textSlice.actions;

export default textSlice.reducer;
