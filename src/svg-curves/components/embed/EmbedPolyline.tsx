import * as React from "react";
import { type Polyline, type Delta, type Style } from "../../utils/types.ts";
import { round } from "../../utils/round.ts";
import { Embed } from "./Embed";
import { Canvas } from "../../connected/Canvas.tsx";
import { Code } from "../../connected/Code.tsx";
import { Polyline as CodePolyline } from "../code/CodePolyline";
import { ValueSegment } from "../code/CodeAttributeValueSegment";
import { DragMove } from "../canvas/DragMove.tsx";
import "./EmbedPolyline.scss";

type EmbedPolylineProps = Polyline & {
  setPolylinePoint: (index: number, delta: Delta) => void;
} & {
  style: Style;
  fullScreen?: boolean;
};

export const EmbedPolyline: React.FC<EmbedPolylineProps> = ({
  points,
  setPolylinePoint,
  style,
  fullScreen,
}) => (
  <Embed id="embedPolyline" link="/editor/polyline" fullScreen={fullScreen}>
    <Canvas>
      <polyline
        points={points.map(({ x, y }) => `${x},${y}`).join(" ")}
        {...style}
      />
      {points.map((point, index) => (
        <DragMove
          key={index}
          id={`control-${index}`}
          x={point.x}
          y={point.y}
          moveCoord={(delta) => setPolylinePoint(index, delta)}
        />
      ))}
    </Canvas>
    <Code>
      <CodePolyline>
        {points.map((point, index) => (
          <ValueSegment
            key={index}
            id={`value-${index}`}
            description="Point"
            value={`${round(point.x)},${round(point.y)}`}
          />
        ))}
      </CodePolyline>
    </Code>
  </Embed>
);
