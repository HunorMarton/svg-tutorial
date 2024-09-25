import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Arc, type Delta } from "../../../utils/types";
import { resize } from "../canvas";
import * as viewBoxMin from "../../../constants/viewBoxSize";
import { round100 as round } from "../../../utils/round";
import { overrideX, overrideY } from "../../../utils/overrideCoord";
import * as arcUtil from "../../../utils/arcUtil";

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

export const arcSlice = createSlice({
  name: "arc",
  initialState,
  reducers: {
    setStartPoint: (state, action: PayloadAction<Delta>) => {
      state.x1 = overrideX(state.x1 + action.payload.dx, viewBox.width);
      state.y1 = overrideY(state.y1 + action.payload.dy, viewBox.height);

      Object.assign(state, arcUtil.calculateArcCenter(state)); // Assigns cx, cy
      Object.assign(state, arcUtil.calculateDrags(state)); // Assigns rxDragX, rxDragY, ryDragX, ryDragY, angleDragX, angleDragY
    },
    setRotation: (state, action: PayloadAction<Delta>) => {
      state.radian = arcUtil.calculateAngle({
        x1: state.cx,
        y1: state.cy,
        x2: state.angleDragX + action.payload.dx,
        y2: state.angleDragY + action.payload.dy,
      });
      state.degree = round((state.radian * 180) / Math.PI);

      const { θ1, θ2 } = arcUtil.calculateArcPointAngles(state);
      Object.assign(state, arcUtil.calculateArcPoints({ ...state, θ1, θ2 })); // Assigns x1, y1, x2, y2
      Object.assign(state, arcUtil.calculateDrags(state)); // Assigns rxDragX, rxDragY, ryDragX, ryDragY, angleDragX, angleDragY
    },
    setRadiusX: (state, action: PayloadAction<Delta>) => {
      state.rx = arcUtil.calculateDistance({
        x1: state.cx,
        y1: state.cy,
        x2: state.rxDragX + action.payload.dx,
        y2: state.rxDragY + action.payload.dy,
      });
      const { θ1, θ2 } = arcUtil.calculateArcPointAngles(state);
      Object.assign(state, arcUtil.calculateArcPoints({ ...state, θ1, θ2 })); // Assigns x1, y1, x2, y2
      Object.assign(state, arcUtil.calculateDrags(state)); // Assigns rxDragX, rxDragY, ryDragX, ryDragY, angleDragX, angleDragY
    },
    setRadiusY: (state, action: PayloadAction<Delta>) => {
      state.ry = arcUtil.calculateDistance({
        x1: state.cx,
        y1: state.cy,
        x2: state.ryDragX + action.payload.dx,
        y2: state.ryDragY + action.payload.dy,
      });
      const { θ1, θ2 } = arcUtil.calculateArcPointAngles(state);
      Object.assign(state, arcUtil.calculateArcPoints({ ...state, θ1, θ2 })); // Assigns x1, y1, x2, y2
      Object.assign(state, arcUtil.calculateDrags(state)); // Assigns rxDragX, rxDragY, ryDragX, ryDragY, angleDragX, angleDragY
    },
    setFlags: (
      state,
      action: PayloadAction<{ largeArcFlag: boolean; sweepFlag: boolean }>
    ) => {
      state.largeArcFlag = action.payload.largeArcFlag;
      state.sweepFlag = action.payload.sweepFlag;

      Object.assign(state, arcUtil.calculateArcCenter(state)); // Assigns cx, cy
      Object.assign(state, arcUtil.calculateDrags(state)); // Assigns rxDragX, rxDragY, ryDragX, ryDragY, angleDragX, angleDragY
    },
    setEndPoint: (state, action: PayloadAction<Delta>) => {
      state.x2 = overrideX(state.x2 + action.payload.dx, viewBox.width);
      state.y2 = overrideY(state.y2 + action.payload.dy, viewBox.height);

      Object.assign(state, arcUtil.calculateArcCenter(state)); // Assigns cx, cy
      Object.assign(state, arcUtil.calculateDrags(state)); // Assigns rxDragX, rxDragY, ryDragX, ryDragY, angleDragX, angleDragY
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
  setRotation,
  setRadiusX,
  setRadiusY,
  setFlags,
  setEndPoint,
} = arcSlice.actions;

export default arcSlice.reducer;
