import { configureStore } from "@reduxjs/toolkit";
import arcReducer from "./features/arc";
import canvasReducer from "./features/canvas";
import circleReducer from "./features/circle";
import cubicBezierReducer from "./features/cubicBezier";
import lineReducer from "./features/line";
import rectReducer from "./features/rect";
import quadraticBezierReducer from "./features/quadraticBezier";

export const store = configureStore({
  reducer: {
    arc: arcReducer,
    canvas: canvasReducer,
    circle: circleReducer,
    cubicBezier: cubicBezierReducer,
    line: lineReducer,
    rect: rectReducer,
    quadraticBezier: quadraticBezierReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
