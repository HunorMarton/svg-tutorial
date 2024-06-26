import * as React from "react";
import { type QuadraticBezier, type Coordinate } from "../utils/types";
import { round } from "../utils/round";
import { Canvas } from "../connected/Canvas";
import { Code } from "./Code";
import { DragMove } from "./DragMove";

type PageQuadraticBezierProps = QuadraticBezier & {
  setQuadraticBezierStartPoint: (coord: Coordinate) => void;
  setQuadraticBezierControlPoint1: (coord: Coordinate) => void;
  setQuadraticBezierEndPoint: (coord: Coordinate) => void;
};

export const PageQuadraticBezier: React.FC<PageQuadraticBezierProps> = ({
  x0,
  y0,
  x1,
  y1,
  x,
  y,
  setQuadraticBezierStartPoint,
  setQuadraticBezierControlPoint1,
  setQuadraticBezierEndPoint,
}) => (
  <>
    <Canvas>
      <line className="presentationHelper" x1={x0} y1={y0} x2={x1} y2={y1} />
      <line className="presentationHelper" x1={x1} y1={y1} x2={x} y2={y} />
      <path
        className="presentation"
        d={`
              M ${x0} ${y0}
              Q ${x1} ${y1},
              ${x} ${y}`}
      />
      <DragMove x={x0} y={y0} changeCoord={setQuadraticBezierStartPoint} />
      <DragMove x={x1} y={y1} changeCoord={setQuadraticBezierControlPoint1} />
      <DragMove x={x} y={y} changeCoord={setQuadraticBezierEndPoint} />
    </Canvas>
    <Code>
      {`M ${round(x0)} ${round(y0)} Q ${round(x1)} ${round(y1)}, ${round(
        x
      )} ${round(y)}`}
    </Code>
  </>
);
