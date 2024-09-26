import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Arc, type Point, type Delta } from "../../utils/types";
import { resize } from "./canvas";
import { set } from "./style";
import * as viewBoxMin from "../../constants/viewBoxSize";
import { round100 as round } from "../../utils/round";
import { overrideX, overrideY } from "../../utils/overrideCoord";
import * as arcUtil from "../../utils/arcUtil";

const initialState: Arc = {
  x1: 145,
  y1: 174,
  x2: 288,
  y2: 314,
  largeArcFlag: false,
  sweepFlag: false,
  rx: 150,
  ry: 120,
  degree: 20,
  // Helpers
  radian: 0.34906585,
  rxDragX: 0,
  rxDragY: 0,
  ryDragX: 0,
  ryDragY: 0,
  angleDragX: 0,
  angleDragY: 0,
  cx: 292,
  cy: 192,
};

const viewBox = {
  width: viewBoxMin.WIDTH,
  height: viewBoxMin.HEIGHT,
};

function onPointOrFlagChanged(state: Arc) {
  Object.assign(state, arcUtil.calculateArcCenter(state)); // Assigns cx, cy
  Object.assign(state, arcUtil.calculateDrags(state)); // Assigns rxDragX, rxDragY, ryDragX, ryDragY, angleDragX, angleDragY
}

function onRadiusOrRotationChanged(state: Arc) {
  const { θ1, θ2 } = arcUtil.calculateArcPointAngles(state);
  Object.assign(state, arcUtil.calculateArcPoints({ ...state, θ1, θ2 })); // Assigns x1, y1, x2, y2
  Object.assign(state, arcUtil.calculateDrags(state)); // Assigns rxDragX, rxDragY, ryDragX, ryDragY, angleDragX, angleDragY
}

export const arcSlice = createSlice({
  name: "arc",
  initialState,
  reducers: {
    setStartPoint: (state, action: PayloadAction<Delta>) => {
      state.x1 = overrideX(state.x1 + action.payload.dx, viewBox.width);
      state.y1 = overrideY(state.y1 + action.payload.dy, viewBox.height);

      onPointOrFlagChanged(state);
    },
    setStartPointByCoord: (state, action: PayloadAction<Partial<Point>>) => {
      const { x, y } = action.payload;
      if (x !== undefined) state.x1 = overrideX(x, viewBox.width);
      if (y !== undefined) state.y1 = overrideY(y, viewBox.height);

      onPointOrFlagChanged(state);
    },
    setRotation: (state, action: PayloadAction<Delta>) => {
      state.radian = arcUtil.calculateAngle({
        x1: state.cx,
        y1: state.cy,
        x2: state.angleDragX + action.payload.dx,
        y2: state.angleDragY + action.payload.dy,
      });
      state.degree = round((state.radian * 180) / Math.PI);

      onRadiusOrRotationChanged(state);
    },
    setRotationByValue: (state, action: PayloadAction<number>) => {
      state.degree = round(action.payload);
      state.radian = (state.degree * Math.PI) / 180;

      onRadiusOrRotationChanged(state);
    },
    setRadiusX: (state, action: PayloadAction<Delta>) => {
      state.rx = arcUtil.calculateDistance({
        x1: state.cx,
        y1: state.cy,
        x2: state.rxDragX + action.payload.dx,
        y2: state.rxDragY + action.payload.dy,
      });
      onRadiusOrRotationChanged(state);
    },
    setRadiusXByValue: (state, action: PayloadAction<number>) => {
      state.rx = action.payload;
      onRadiusOrRotationChanged(state);
    },
    setRadiusY: (state, action: PayloadAction<Delta>) => {
      state.ry = arcUtil.calculateDistance({
        x1: state.cx,
        y1: state.cy,
        x2: state.ryDragX + action.payload.dx,
        y2: state.ryDragY + action.payload.dy,
      });
      onRadiusOrRotationChanged(state);
    },
    setRadiusYByValue: (state, action: PayloadAction<number>) => {
      state.ry = action.payload;
      onRadiusOrRotationChanged(state);
    },
    setFlags: (
      state,
      action: PayloadAction<{ largeArcFlag?: boolean; sweepFlag?: boolean }>
    ) => {
      const { largeArcFlag, sweepFlag } = action.payload;
      if (largeArcFlag !== undefined) state.largeArcFlag = largeArcFlag;
      if (sweepFlag !== undefined) state.sweepFlag = sweepFlag;

      onPointOrFlagChanged(state);
    },
    setEndPoint: (state, action: PayloadAction<Delta>) => {
      state.x2 = overrideX(state.x2 + action.payload.dx, viewBox.width);
      state.y2 = overrideY(state.y2 + action.payload.dy, viewBox.height);

      onPointOrFlagChanged(state);
    },
    setEndPointByCoord: (state, action: PayloadAction<Partial<Point>>) => {
      const { x, y } = action.payload;
      if (x !== undefined) state.x2 = overrideX(x, viewBox.width);
      if (y !== undefined) state.y2 = overrideY(y, viewBox.height);

      onPointOrFlagChanged(state);
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
export const {
  setStartPoint,
  setStartPointByCoord,
  setRotation,
  setRotationByValue,
  setRadiusX,
  setRadiusXByValue,
  setRadiusY,
  setRadiusYByValue,
  setFlags,
  setEndPoint,
  setEndPointByCoord,
} = arcSlice.actions;

export default arcSlice.reducer;
