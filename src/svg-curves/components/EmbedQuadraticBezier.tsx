import * as React from "react";
import { type QuadraticBezier, type Coordinate } from "../utils/types";
import { round } from "../utils/round";
import { Embed } from "./Embed";
import { Canvas } from "../connected/Canvas";
import { Code } from "./Code";
import { CodeAttributeValueSegment as ValueSegment } from "./CodeAttributeValueSegment";
import { DragMove } from "./DragMove";
import "./EmbedQuadraticBezier.scss";

type PageQuadraticBezierProps = QuadraticBezier & {
  setQuadraticBezierStartPoint: (coord: Coordinate) => void;
  setQuadraticBezierControlPoint1: (coord: Coordinate) => void;
  setQuadraticBezierEndPoint: (coord: Coordinate) => void;
} & {
  fullScreen?: boolean;
};

export const EmbedQuadraticBezier: React.FC<PageQuadraticBezierProps> = ({
  x0,
  y0,
  x1,
  y1,
  x,
  y,
  setQuadraticBezierStartPoint,
  setQuadraticBezierControlPoint1,
  setQuadraticBezierEndPoint,
  fullScreen,
}) => (
  <Embed id="embedQuadraticBezier" fullScreen={fullScreen}>
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
      <DragMove
        id="control-start"
        x={x0}
        y={y0}
        changeCoord={setQuadraticBezierStartPoint}
      />
      <DragMove
        id="control-control-1"
        x={x1}
        y={y1}
        changeCoord={setQuadraticBezierControlPoint1}
      />
      <DragMove
        id="control-end"
        x={x}
        y={y}
        changeCoord={setQuadraticBezierEndPoint}
      />
    </Canvas>
    <Code>
      <ValueSegment value="M" />
      <ValueSegment id="value-start" value={`${round(x0)} ${round(y0)}`} />
      <ValueSegment value="Q" />
      <ValueSegment id="value-control-1" value={`${round(x1)} ${round(y1)}`} />
      <ValueSegment id="value-end" value={`${round(x)} ${round(y)}`} />
    </Code>
  </Embed>
);