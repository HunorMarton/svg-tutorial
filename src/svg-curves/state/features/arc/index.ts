import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Arc, type Delta } from "../../../utils/types";
import { resize } from "../canvas";
import * as viewBoxMin from "../../../constants/viewBoxSize";
import { round100 as round } from "../../../utils/round";
import overrideCoord from "../../../utils/overrideCoord";
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
  width: 500,
  height: 500,
};

export const arcSlice = createSlice({
  name: "arc",
  initialState,
  reducers: {
    setStartPoint: (state, action: PayloadAction<Delta>) => {
      const { x: x1, y: y1 } = overrideCoord({
        x: state.x1 + action.payload.dx,
        y: state.y1 + action.payload.dy,
        width: viewBox.width,
        height: viewBox.height,
      });
      state.x1 = x1;
      state.y1 = y1;

      const { cx, cy } = arcUtil.calculateArcCenter(
        Object.assign({}, state, {
          x1,
          y1,
        })
      );
      state.cx = cx;
      state.cy = cy;

      const { rxDragX, rxDragY, ryDragX, ryDragY, angleDragX, angleDragY } =
        arcUtil.calculateDrags({
          cx,
          cy,
          rx: state.rx,
          ry: state.ry,
          radian: state.radian,
        });
      state.rxDragX = rxDragX;
      state.rxDragY = rxDragY;
      state.ryDragX = ryDragX;
      state.ryDragY = ryDragY;
      state.angleDragX = angleDragX;
      state.angleDragY = angleDragY;
    },
    setRotation: (state, action: PayloadAction<Delta>) => {
      const radian = arcUtil.calculateAngle({
        x1: state.cx,
        y1: state.cy,
        x2: state.angleDragX + action.payload.dx,
        y2: state.angleDragY + action.payload.dy,
      });
      const degree = round((radian * 180) / Math.PI);

      const { θ1, θ2 } = arcUtil.calculateArcPointAngles({
        x1: state.x1,
        y1: state.y1,
        x2: state.x2,
        y2: state.y2,
        cx: state.cx,
        cy: state.cy,
        rx: state.rx,
        ry: state.ry,
        radian,
      });
      const { x1, y1, x2, y2 } = arcUtil.calculateArcPoints({
        cx: state.cx,
        cy: state.cy,
        rx: state.rx,
        ry: state.ry,
        radian,
        θ1,
        θ2,
      });

      const { rxDragX, rxDragY, ryDragX, ryDragY, angleDragX, angleDragY } =
        arcUtil.calculateDrags({
          cx: state.cx,
          cy: state.cy,
          rx: state.rx,
          ry: state.ry,
          radian,
        });

      state.radian = radian;
      state.degree = degree;
      state.x1 = x1;
      state.y1 = y1;
      state.x2 = x2;
      state.y2 = y2;
      state.rxDragX = rxDragX;
      state.rxDragY = rxDragY;
      state.ryDragX = ryDragX;
      state.ryDragY = ryDragY;
      state.angleDragX = angleDragX;
      state.angleDragY = angleDragY;
    },
    setRadiusX: (state, action: PayloadAction<Delta>) => {
      const { θ1, θ2 } = arcUtil.calculateArcPointAngles({
        x1: state.x1,
        y1: state.y1,
        x2: state.x2,
        y2: state.y2,
        cx: state.cx,
        cy: state.cy,
        rx: state.rx,
        ry: state.ry,
        radian: state.radian,
      });
      const rx = arcUtil.calculateDistance({
        x1: state.cx,
        y1: state.cy,
        x2: state.rxDragX + action.payload.dx,
        y2: state.rxDragY + action.payload.dy,
      });
      const { x1, y1, x2, y2 } = arcUtil.calculateArcPoints({
        cx: state.cx,
        cy: state.cy,
        rx,
        ry: state.ry,
        radian: state.radian,
        θ1,
        θ2,
      });
      const { rxDragX, rxDragY, ryDragX, ryDragY, angleDragX, angleDragY } =
        arcUtil.calculateDrags({
          cx: state.cx,
          cy: state.cy,
          rx,
          ry: state.ry,
          radian: state.radian,
        });
      state.rx = rx;
      state.x1 = x1;
      state.y1 = y1;
      state.x2 = x2;
      state.y2 = y2;
      state.rxDragX = rxDragX;
      state.rxDragY = rxDragY;
      state.ryDragX = ryDragX;
      state.ryDragY = ryDragY;
      state.angleDragX = angleDragX;
      state.angleDragY = angleDragY;
    },
    setRadiusY: (state, action: PayloadAction<Delta>) => {
      const { θ1, θ2 } = arcUtil.calculateArcPointAngles({
        x1: state.x1,
        y1: state.y1,
        x2: state.x2,
        y2: state.y2,
        cx: state.cx,
        cy: state.cy,
        rx: state.rx,
        ry: state.ry,
        radian: state.radian,
      });
      const ry = arcUtil.calculateDistance({
        x1: state.cx,
        y1: state.cy,
        x2: state.ryDragX + action.payload.dx,
        y2: state.ryDragY + action.payload.dy,
      });
      const { x1, y1, x2, y2 } = arcUtil.calculateArcPoints({
        cx: state.cx,
        cy: state.cy,
        rx: state.rx,
        ry,
        radian: state.radian,
        θ1,
        θ2,
      });
      const { rxDragX, rxDragY, ryDragX, ryDragY, angleDragX, angleDragY } =
        arcUtil.calculateDrags({
          cx: state.cx,
          cy: state.cy,
          rx: state.rx,
          ry,
          radian: state.radian,
        });
      state.ry = ry;
      state.x1 = x1;
      state.y1 = y1;
      state.x2 = x2;
      state.y2 = y2;
      state.rxDragX = rxDragX;
      state.rxDragY = rxDragY;
      state.ryDragX = ryDragX;
      state.ryDragY = ryDragY;
      state.angleDragX = angleDragX;
      state.angleDragY = angleDragY;
    },
    setFlags: (
      state,
      action: PayloadAction<{ largeArcFlag: boolean; sweepFlag: boolean }>
    ) => {
      const { cx, cy } = arcUtil.calculateArcCenter(
        Object.assign({}, state, {
          largeArcFlag: action.payload.largeArcFlag,
          sweepFlag: action.payload.sweepFlag,
        })
      );
      const { rxDragX, rxDragY, ryDragX, ryDragY, angleDragX, angleDragY } =
        arcUtil.calculateDrags({
          cx,
          cy,
          rx: state.rx,
          ry: state.ry,
          radian: state.radian,
        });
      state.largeArcFlag = action.payload.largeArcFlag;
      state.sweepFlag = action.payload.sweepFlag;
      state.cx = cx;
      state.cy = cy;
      state.rxDragX = rxDragX;
      state.rxDragY = rxDragY;
      state.ryDragX = ryDragX;
      state.ryDragY = ryDragY;
      state.angleDragX = angleDragX;
      state.angleDragY = angleDragY;
    },
    setEndPoint: (state, action: PayloadAction<Delta>) => {
      const { x: x2, y: y2 } = overrideCoord({
        x: state.x2 + action.payload.dx,
        y: state.y2 + action.payload.dy,
        width: viewBox.width,
        height: viewBox.height,
      });
      state.x2 = x2;
      state.y2 = y2;

      const { cx, cy } = arcUtil.calculateArcCenter(
        Object.assign({}, state, {
          x2,
          y2,
        })
      );
      state.cx = cx;
      state.cy = cy;

      const { rxDragX, rxDragY, ryDragX, ryDragY, angleDragX, angleDragY } =
        arcUtil.calculateDrags({
          cx,
          cy,
          rx: state.rx,
          ry: state.ry,
          radian: state.radian,
        });
      state.rxDragX = rxDragX;
      state.rxDragY = rxDragY;
      state.ryDragX = ryDragX;
      state.ryDragY = ryDragY;
      state.angleDragX = angleDragX;
      state.angleDragY = angleDragY;
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
