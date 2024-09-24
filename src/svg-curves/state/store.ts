import { configureStore } from "@reduxjs/toolkit";
import arcReducer from "./features/arc";
import canvasReducer from "./features/canvas";
import cubicBezierReducer from "./features/cubicBezier";
import quadraticBezierReducer from "./features/quadraticBezier";

export const store = configureStore({
  reducer: {
    arc: arcReducer,
    canvas: canvasReducer,
    cubicBezier: cubicBezierReducer,
    quadraticBezier: quadraticBezierReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
