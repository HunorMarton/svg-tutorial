import * as React from "react";
import { type CubicBezier, type Delta, type Style } from "../../utils/types";
import { round } from "../../utils/round";
import { Embed } from "./Embed";
import { Canvas } from "../../connected/Canvas";
import { Code } from "../../connected/Code";
import { Path } from "../code/CodePath";
import { ValueSegment } from "../code/CodeAttributeValueSegment";
import { DragMove } from "../canvas/DragMove";
import "./EmbedCubicBezier.scss";

type EmbedCubicBezierProps = CubicBezier & {
  setCubicBezierStartPoint: (coord: Delta) => void;
  setCubicBezierControlPoint1: (coord: Delta) => void;
  setCubicBezierControlPoint2: (coord: Delta) => void;
  setCubicBezierEndPoint: (coord: Delta) => void;
} & {
  style: Style;
  fullScreen?: boolean;
};

export const EmbedCubicBezier: React.FC<EmbedCubicBezierProps> = ({
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
  style,
  fullScreen,
}) => (
  <Embed
    id="embedCubicBezier"
    link="/editor/cubic-bezier"
    fullScreen={fullScreen}
  >
    <Canvas>
      <line className="presentationHelper" x1={x0} y1={y0} x2={x1} y2={y1} />
      <line className="presentationHelper" x1={x2} y1={y2} x2={x} y2={y} />
      <path
        d={`
              M ${x0} ${y0}
              C ${x1} ${y1},
              ${x2} ${y2},
              ${x} ${y}`}
        {...style}
      />
      <DragMove
        id="control-start"
        x={x0}
        y={y0}
        moveCoord={setCubicBezierStartPoint}
      />
      <DragMove
        id="control-control-1"
        x={x1}
        y={y1}
        moveCoord={setCubicBezierControlPoint1}
      />
      <DragMove
        id="control-control-2"
        x={x2}
        y={y2}
        moveCoord={setCubicBezierControlPoint2}
      />
      <DragMove
        id="control-end"
        x={x}
        y={y}
        moveCoord={setCubicBezierEndPoint}
      />
    </Canvas>
    <Code>
      <Path>
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
      </Path>
    </Code>
  </Embed>
);
