import * as React from "react";
import { type Arc, type Coordinate } from "../utils/types";
import { round } from "../utils/round";
import { Embed } from "./Embed";
import { Canvas } from "../connected/Canvas";
import { Code } from "./Code";
import { CodeAttributeValueSegment as ValueSegment } from "./CodeAttributeValueSegment";
import { DragMove } from "./DragMove";
import { DragDistance } from "./DragDistance";
import { DragRotation } from "./DragRotation";
import "./EmbedArc.scss";

type PageArcProps = Arc & {
  setArcFlags: ({
    largeArcFlag,
    sweepFlag,
  }: {
    largeArcFlag: boolean;
    sweepFlag: boolean;
  }) => void;
  setArcRotation: (coord: Coordinate) => void;
  setArcRadiusX: (coord: Coordinate) => void;
  setArcRadiusY: (coord: Coordinate) => void;
  setArcStartPoint: (coord: Coordinate) => void;
  setArcEndPoint: (coord: Coordinate) => void;
} & {
  fullScreen?: boolean;
};

export const EmbedArc: React.FC<PageArcProps> = ({
  x1,
  y1,
  x2,
  y2,
  largeArcFlag,
  sweepFlag,
  rx,
  ry,
  degree,
  cx,
  cy,
  rxDragX,
  rxDragY,
  ryDragX,
  ryDragY,
  angleDragX,
  angleDragY,
  setArcFlags,
  setArcRotation,
  setArcRadiusX,
  setArcRadiusY,
  setArcStartPoint,
  setArcEndPoint,
  fullScreen,
}) => {
  const ArcAlternative: React.FC<{
    id: string;
    largeArcFlag: boolean;
    sweepFlag: boolean;
  }> = ({ id, largeArcFlag, sweepFlag }) => {
    const onClick = () => setArcFlags({ largeArcFlag, sweepFlag });
    const path = `
      M ${x1} ${y1}
      A ${rx} ${ry} ${degree}
      ${+largeArcFlag} ${+sweepFlag},
      ${x2} ${y2}`;

    return (
      <g id={id} onClick={onClick} className="presentationAlternative">
        <path className="presentationAlternativeHitArea" d={path} />
        <path d={path} />
      </g>
    );
  };

  return (
    <Embed id="embedArc" fullScreen={fullScreen}>
      <Canvas>
        <line
          className="presentationHelper" // Dashed line from the center
          x1={cx}
          y1={cy}
          x2={rxDragX}
          y2={rxDragY}
        />
        <line
          className="presentationHelper" // Dashed line from the center
          x1={cx}
          y1={cy}
          x2={ryDragX}
          y2={ryDragY}
        />

        <ArcAlternative
          id="control-large-arc-flag"
          largeArcFlag={!largeArcFlag}
          sweepFlag={sweepFlag}
        />
        <ArcAlternative
          id="control-sweep-flag"
          largeArcFlag={largeArcFlag}
          sweepFlag={!sweepFlag}
        />
        <ArcAlternative
          id="control-flags"
          largeArcFlag={!largeArcFlag}
          sweepFlag={!sweepFlag}
        />
        <path
          className="presentation"
          d={`
              M ${x1} ${y1}
              A ${rx} ${ry} ${degree}
              ${+largeArcFlag} ${+sweepFlag},
              ${x2} ${y2}`}
        />
        <DragRotation
          id="control-rotation"
          x={angleDragX}
          y={angleDragY}
          degree={degree}
          changeCoord={setArcRotation}
        />
        <DragDistance
          id="control-radius-x"
          x={rxDragX}
          y={rxDragY}
          degree={degree + 90}
          distance={rx}
          changeCoord={setArcRadiusX}
        />
        <DragDistance
          id="control-radius-y"
          x={ryDragX}
          y={ryDragY}
          degree={degree}
          distance={ry}
          changeCoord={setArcRadiusY}
        />
        <DragMove
          id="control-start"
          x={x1}
          y={y1}
          changeCoord={setArcStartPoint}
        />
        <DragMove id="control-end" x={x2} y={y2} changeCoord={setArcEndPoint} />
      </Canvas>
      <Code>
        <ValueSegment value="M" />
        <ValueSegment id="value-start" value={`${round(x1)} ${round(y1)}`} />
        <ValueSegment value="A" />
        <ValueSegment id="value-radius-x" value={`${round(rx)}`} />
        <ValueSegment id="value-radius-y" value={`${round(ry)}`} />
        <ValueSegment id="value-rotation" value={`${round(degree)}`} />
        <ValueSegment id="value-large-arc-flag" value={`${+largeArcFlag}`} />
        <ValueSegment id="value-sweep-flag" value={`${+sweepFlag}`} />
        <ValueSegment id="value-end" value={`${round(x2)} ${round(y2)}`} />
      </Code>
    </Embed>
  );
};