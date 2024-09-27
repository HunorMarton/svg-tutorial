import { configureStore } from "@reduxjs/toolkit";
import arcReducer from "./features/arc";
import canvasReducer from "./features/canvas";
import circleReducer from "./features/circle";
import cubicBezierReducer from "./features/cubicBezier";
import lineReducer from "./features/line";
import rectReducer from "./features/rect";
import styleReducer from "./features/style";
import quadraticBezierReducer from "./features/quadraticBezier";
import textReducer from "./features/text";

export const store = configureStore({
  reducer: {
    arc: arcReducer,
    canvas: canvasReducer,
    circle: circleReducer,
    cubicBezier: cubicBezierReducer,
    line: lineReducer,
    quadraticBezier: quadraticBezierReducer,
    rect: rectReducer,
    style: styleReducer,
    text: textReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
