import * as React from "react";
import { type Line, type Delta } from "../utils/types";
import { round } from "../utils/round";
import { Embed } from "./Embed";
import { Canvas } from "../connected/Canvas";
import { Code } from "../connected/Code";
import { CodeElement as Element } from "./CodeElement.tsx";
import { Attribute } from "./CodeAttribute.tsx";
import { DragMove } from "./DragMove";
import "./EmbedLine.scss";

type EmbedLineProps = Line & {
  setLineCoordinate1: (coord: Delta) => void;
  setLineCoordinate2: (coord: Delta) => void;
} & {
  fullScreen?: boolean;
};

export const EmbedLine: React.FC<EmbedLineProps> = ({
  x1,
  y1,
  x2,
  y2,
  setLineCoordinate1,
  setLineCoordinate2,
  fullScreen,
}) => (
  <Embed id="embedLine" fullScreen={fullScreen}>
    <Canvas>
      <line className="presentation" x1={x1} y1={y1} x2={x2} y2={y2} />
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
