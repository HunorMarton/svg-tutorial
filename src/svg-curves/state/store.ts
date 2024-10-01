import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { track } from "../../utils/analytics";
import arcReducer from "./features/arc";
import canvasReducer from "./features/canvas";
import circleReducer from "./features/circle";
import cubicBezierReducer from "./features/cubicBezier";
import lineReducer from "./features/line";
import polygonReducer from "./features/polygon";
import polylineReducer from "./features/polyline";
import rectReducer from "./features/rect";
import styleReducer from "./features/style";
import quadraticBezierReducer from "./features/quadraticBezier";
import textReducer from "./features/text";

const logger: Middleware = (storeAPI) => {
  return (next) => (action: unknown) => {
    if (typeof action === "object" && action !== null && "type" in action) {
      const type = (action as { type: string }).type;
      const blacklist = ["canvas/resize", "style/set"];

      // Send analytics for each action only once, except for blacklisted actions
      if (!blacklist.includes(type)) {
        track(
          "Redux Action",
          { action: (action as { type: string }).type },
          true
        );
      }
    }
    return next(action);
  };
};

export const store = configureStore({
  reducer: {
    arc: arcReducer,
    canvas: canvasReducer,
    circle: circleReducer,
    cubicBezier: cubicBezierReducer,
    line: lineReducer,
    quadraticBezier: quadraticBezierReducer,
    polygon: polygonReducer,
    polyline: polylineReducer,
    rect: rectReducer,
    style: styleReducer,
    text: textReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
