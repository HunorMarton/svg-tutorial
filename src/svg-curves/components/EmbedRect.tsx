import * as React from "react";
import { type Rect, type Delta, type Style } from "../utils/types";
import { round } from "../utils/round";
import { Embed } from "./Embed";
import { Canvas } from "../connected/Canvas";
import { Code } from "../connected/Code";
import { Element } from "./CodeElement.tsx";
import { Attribute } from "./CodeAttribute.tsx";
import { DragMove } from "./DragMove";
import { DragDistance } from "./DragDistance";
import "./EmbedRect.scss";

type EmbedRectProps = Rect & {
  setRectCoordinate: (coord: Delta) => void;
  setRectWidth: (coord: Delta) => void;
  setRectHeight: (coord: Delta) => void;
} & {
  style: Style;
  fullScreen?: boolean;
};

export const EmbedRect: React.FC<EmbedRectProps> = ({
  x,
  y,
  width,
  height,
  setRectCoordinate,
  setRectWidth,
  setRectHeight,
  style,
  fullScreen,
}) => (
  <Embed id="embedRect" link="/editor/rect" fullScreen={fullScreen}>
    <Canvas>
      <rect x={x} y={y} width={width} height={height} {...style} />
      <DragDistance
        id="control-width"
        x={x + width}
        y={y + height / 2}
        degree={90}
        distance={width}
        moveCoord={setRectWidth}
      />
      <DragDistance
        id="control-height"
        x={x + width / 2}
        y={y + height}
        degree={0}
        distance={height}
        moveCoord={setRectHeight}
      />
      <DragMove
        id="control-coordinate"
        x={x}
        y={y}
        moveCoord={setRectCoordinate}
      />
    </Canvas>
    <Code>
      <Element element="rect">
        <Attribute id="value-x" description="X" x={round(x)} />
        <Attribute id="value-y" description="Y" y={round(y)} />
        <Attribute id="value-width" description="Width" width={round(width)} />
        <Attribute
          id="value-height"
          description="Height"
          height={round(height)}
        />
      </Element>
    </Code>
  </Embed>
);
