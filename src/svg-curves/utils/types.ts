export type Delta = { dx: number; dy: number };
export type Size = { width: number; height: number };

export type Arc = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  largeArcFlag: boolean;
  sweepFlag: boolean;
  rx: number;
  ry: number;
  degree: number;
  // Helpers
  radian: number;
  rxDragX: number;
  rxDragY: number;
  ryDragX: number;
  ryDragY: number;
  angleDragX: number;
  angleDragY: number;
  cx: number;
  cy: number;
};

export type Canvas = {
  zoom: number;
  svgWidth: number;
  svgHeight: number;
  viewBoxWidth: number;
  viewBoxHeight: number;
};

export type CubicBezier = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x: number;
  y: number;
};

export type QuadraticBezier = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  x: number;
  y: number;
};
