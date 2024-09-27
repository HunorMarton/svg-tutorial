import * as React from "react";
import { type Text, type Delta, type Style } from "../utils/types";
import { round } from "../utils/round";
import { Embed } from "./Embed";
import { Canvas } from "../connected/Canvas";
import { Code } from "../connected/Code";
import { Element } from "./CodeElement.tsx";
import { Attribute } from "./CodeAttribute.tsx";
import { DragMove } from "./DragMove";
import "./EmbedText.scss";

type EmbedTextProps = Text & {
  setTextCoordinate: (coord: Delta) => void;
} & {
  style: Style;
  fullScreen?: boolean;
};

export const EmbedText: React.FC<EmbedTextProps> = ({
  x,
  y,
  text,
  fontFamily,
  fontSize,
  textAnchor,
  setTextCoordinate,
  style,
  fullScreen,
}) => (
  <Embed id="embedText" link="/editor/text" fullScreen={fullScreen}>
    <Canvas>
      <text
        x={x}
        y={y}
        fontFamily={fontFamily}
        fontSize={fontSize}
        textAnchor={textAnchor}
        {...style}
      >
        {text}
      </text>
      <DragMove
        id="control-coordinate"
        x={x}
        y={y}
        moveCoord={setTextCoordinate}
      />
    </Canvas>
    <Code>
      <Element element="text" content={text}>
        <Attribute id="value-x" description="X" x={round(x)} />
        <Attribute id="value-y" description="Y" y={round(y)} />
        <Attribute font-family={fontFamily} />
        <Attribute font-size={fontSize} />
        {textAnchor !== "start" && <Attribute text-anchor={textAnchor} />}
      </Element>
    </Code>
  </Embed>
);
