import * as React from "react";
import { type CubicBezier, type Coordinate } from "../utils/types";
import { round } from "../utils/round";
import { Embed } from "./Embed";
import { Canvas } from "../connected/Canvas";
import { Code } from "./Code";
import { CodeAttributeValueSegment as ValueSegment } from "./CodeAttributeValueSegment";
import { DragMove } from "./DragMove";
import "./EmbedCubicBezier.scss";

type PageCubicBezierProps = CubicBezier & {
  setCubicBezierStartPoint: (coord: Coordinate) => void;
  setCubicBezierControlPoint1: (coord: Coordinate) => void;
  setCubicBezierControlPoint2: (coord: Coordinate) => void;
  setCubicBezierEndPoint: (coord: Coordinate) => void;
} & {
  fullScreen?: boolean;
};

export const EmbedCubicBezier: React.FC<PageCubicBezierProps> = ({
  x0,
  y0,
  x1,
  y1,
  x2,
  y2,
  x,
  y,
  setCubicBezierStartPoint,
  setCubicBezierControlPoint1,
  setCubicBezierControlPoint2,
  setCubicBezierEndPoint,
  fullScreen,
}) => (
  <Embed id="embedCubicBezier" fullScreen={fullScreen}>
    <Canvas>
      <line className="presentationHelper" x1={x0} y1={y0} x2={x1} y2={y1} />
      <line className="presentationHelper" x1={x2} y1={y2} x2={x} y2={y} />
      <path
        className="presentation"
        d={`
              M ${x0} ${y0}
              C ${x1} ${y1},
              ${x2} ${y2},
              ${x} ${y}`}
      />
      <DragMove
        id="control-start"
        x={x0}
        y={y0}
        changeCoord={setCubicBezierStartPoint}
      />
      <DragMove
        id="control-control-1"
        x={x1}
        y={y1}
        changeCoord={setCubicBezierControlPoint1}
      />
      <DragMove
        id="control-control-2"
        x={x2}
        y={y2}
        changeCoord={setCubicBezierControlPoint2}
      />
      <DragMove
        id="control-end"
        x={x}
        y={y}
        changeCoord={setCubicBezierEndPoint}
      />
    </Canvas>
    <Code>
      <ValueSegment value="M" />
      <ValueSegment
        id="value-start"
        description="Start Position"
        value={`${round(x0)} ${round(y0)}`}
      />
      <ValueSegment value="C" />
      <ValueSegment
        id="value-control-1"
        description="Control Point 1"
        value={`${round(x1)} ${round(y1)}`}
      />
      <ValueSegment
        id="value-control-2"
        description="Control Point 2"
        value={`${round(x2)} ${round(y2)}`}
      />
      <ValueSegment
        id="value-end"
        description="End Position"
        value={`${round(x)} ${round(y)}`}
      />
    </Code>
  </Embed>
);
