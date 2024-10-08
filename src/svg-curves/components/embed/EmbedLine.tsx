import * as React from "react";
import { type Line, type Delta, type Style } from "../../utils/types.ts";
import { round } from "../../utils/round.ts";
import { Embed } from "./Embed";
import { Canvas } from "../../connected/Canvas.tsx";
import { Code } from "../../connected/Code.tsx";
import { Element } from "../code/CodeElement.tsx";
import { Attribute } from "../code/CodeAttribute.tsx";
import { DragMove } from "../canvas/DragMove.tsx";
import "./EmbedLine.scss";

type EmbedLineProps = Line & {
  setLineCoordinate1: (coord: Delta) => void;
  setLineCoordinate2: (coord: Delta) => void;
} & {
  style: Style;
  fullScreen?: boolean;
};

export const EmbedLine: React.FC<EmbedLineProps> = ({
  x1,
  y1,
  x2,
  y2,
  setLineCoordinate1,
  setLineCoordinate2,
  style,
  fullScreen,
}) => (
  <Embed id="embedLine" link="/editor/line" fullScreen={fullScreen}>
    <Canvas>
      <line x1={x1} y1={y1} x2={x2} y2={y2} {...style} />
      <DragMove
        id="control-coordinate-1"
        x={x1}
        y={y1}
        moveCoord={setLineCoordinate1}
      />
      <DragMove
        id="control-coordinate-2"
        x={x2}
        y={y2}
        moveCoord={setLineCoordinate2}
      />
    </Canvas>
    <Code>
      <Element element="line">
        <Attribute id="value-x1" description="Start X" x1={round(x1)} />
        <Attribute id="value-y1" description="Start Y" y1={round(y1)} />
        <Attribute id="value-x2" description="End X" x2={round(x2)} />
        <Attribute id="value-y2" description="End Y" y2={round(y2)} />
      </Element>
    </Code>
  </Embed>
);
