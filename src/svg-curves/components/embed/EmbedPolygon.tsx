import * as React from "react";
import { type Polygon, type Delta, type Style } from "../../utils/types.ts";
import { round } from "../../utils/round.ts";
import { Embed } from "./Embed";
import { Canvas } from "../../connected/Canvas.tsx";
import { Code } from "../../connected/Code.tsx";
import { Polygon as CodePolygon } from "../code/CodePolygon";
import { ValueSegment } from "../code/CodeAttributeValueSegment";
import { DragMove } from "../canvas/DragMove.tsx";
import "./EmbedPolygon.scss";

type EmbedPolygonProps = Polygon & {
  setPolygonPoint: (index: number, delta: Delta) => void;
} & {
  style: Style;
  fullScreen?: boolean;
};

export const EmbedPolygon: React.FC<EmbedPolygonProps> = ({
  points,
  setPolygonPoint,
  style,
  fullScreen,
}) => (
  <Embed id="embedPolygon" link="/editor/polygon" fullScreen={fullScreen}>
    <Canvas>
      <polygon
        points={points.map(({ x, y }) => `${x},${y}`).join(" ")}
        {...style}
      />
      {points.map((point, index) => (
        <DragMove
          key={index}
          id={`control-${index}`}
          x={point.x}
          y={point.y}
          moveCoord={(delta) => setPolygonPoint(index, delta)}
        />
      ))}
    </Canvas>
    <Code>
      <CodePolygon>
        {points.map((point, index) => (
          <ValueSegment
            key={index}
            id={`value-${index}`}
            description="Point"
            value={`${round(point.x)},${round(point.y)}`}
          />
        ))}
      </CodePolygon>
    </Code>
  </Embed>
);
