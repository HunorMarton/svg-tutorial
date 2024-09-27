import * as React from "react";
import { type Circle, type Delta, type Style } from "../../utils/types.ts";
import { round } from "../../utils/round.ts";
import { Embed } from "./Embed";
import { Canvas } from "../../connected/Canvas.tsx";
import { Code } from "../../connected/Code.tsx";
import { Element } from "../code/CodeElement.tsx";
import { Attribute } from "../code/CodeAttribute.tsx";
import { DragMove } from "../canvas/DragMove.tsx";
import { DragDistance } from "../canvas/DragDistance.tsx";
import "./EmbedCircle.scss";

type EmbedCircleProps = Circle & {
  setCircleCoordinate: (coord: Delta) => void;
  setCircleRadius: (coord: Delta) => void;
} & {
  style: Style;
  fullScreen?: boolean;
};

export const EmbedCircle: React.FC<EmbedCircleProps> = ({
  cx,
  cy,
  r,
  setCircleCoordinate,
  setCircleRadius,
  style,
  fullScreen,
}) => (
  <Embed id="embedCircle" link="/editor/circle" fullScreen={fullScreen}>
    <Canvas>
      <circle cx={cx} cy={cy} r={r} {...style} />
      <DragDistance
        id="control-radius"
        x={cx + r}
        y={cy}
        degree={90}
        distance={r}
        moveCoord={setCircleRadius}
      />
      <DragMove
        id="control-coordinate"
        x={cx}
        y={cy}
        moveCoord={setCircleCoordinate}
      />
    </Canvas>
    <Code>
      <Element element="circle">
        <Attribute id="value-cx" description="Center X" cx={round(cx)} />
        <Attribute id="value-cy" description="Center Y" cy={round(cy)} />
        <Attribute id="value-radius" description="Radius" r={round(r)} />
      </Element>
    </Code>
  </Embed>
);
