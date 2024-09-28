export type Point = { x: number; y: number };
export type Delta = { dx: number; dy: number };
export type Size = { width: number; height: number };

export type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export type Circle = {
  cx: number;
  cy: number;
  r: number;
};

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Polyline = {
  points: Point[];
};

export type Polygon = {
  points: Point[];
};

export type Text = {
  x: number;
  y: number;
  text: string;
  fontFamily: string;
  fontSize: number;
  textAnchor: "start" | "middle" | "end";
};

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
  viewBoxWidth: number | undefined;
  viewBoxHeight: number | undefined;
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

export type Style = {
  stroke: string;
  strokeWidth: number;
  strokeLinecap: "butt" | "round" | "square";
  strokeLinejoin: "miter" | "round" | "bevel";
  fill: string;
};

export type Selector =
  | {
      feature: "style";
      property: keyof Style;
    }
  | {
      feature: "line";
      property: keyof Line;
    }
  | {
      feature: "circle";
      property: keyof Circle;
    }
  | {
      feature: "rect";
      property: keyof Rect;
    }
  | {
      feature: "polyline";
      property: keyof Polyline;
    }
  | {
      feature: "polygon";
      property: keyof Polygon;
    }
  | {
      feature: "text";
      property: keyof Text;
    }
  | {
      feature: "arc";
      property: keyof Arc;
    }
  | {
      feature: "cubicBezier";
      property: keyof CubicBezier;
    }
  | {
      feature: "quadraticBezier";
      property: keyof QuadraticBezier;
    }
  | {
      feature: "canvas";
      property: keyof Canvas;
    };

export type Generic =
  | {
      feature: "style";
      values: Partial<Style>;
    }
  | {
      feature: "line";
      values: Partial<Line>;
    }
  | {
      feature: "circle";
      values: Partial<Circle>;
    }
  | {
      feature: "rect";
      values: Partial<Rect>;
    }
  | {
      feature: "polyline";
      values: Partial<Polyline>;
    }
  | {
      feature: "polygon";
      values: Partial<Polygon>;
    }
  | {
      feature: "text";
      values: Partial<Text>;
    }
  | {
      feature: "arc";
      values: Partial<Arc>;
    }
  | {
      feature: "cubicBezier";
      values: Partial<CubicBezier>;
    }
  | {
      feature: "quadraticBezier";
      values: Partial<QuadraticBezier>;
    }
  | {
      feature: "canvas";
      values: Partial<Canvas>;
    };
