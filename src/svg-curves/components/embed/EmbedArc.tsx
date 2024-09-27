import * as React from "react";
import { type Arc, type Delta, type Style } from "../../utils/types";
import { round } from "../../utils/round";
import { Embed } from "./Embed";
import { Canvas } from "../../connected/Canvas";
import { Code } from "../../connected/Code";
import { Path } from "../code/CodePath";
import { ValueSegment } from "../code/CodeAttributeValueSegment";
import { DragMove } from "../canvas/DragMove";
import { DragDistance } from "../canvas/DragDistance";
import { DragRotation } from "../canvas/DragRotation";
import "./EmbedArc.scss";

type EmbedArcProps = Arc & {
  setArcFlags: ({
    largeArcFlag,
    sweepFlag,
  }: {
    largeArcFlag: boolean;
    sweepFlag: boolean;
  }) => void;
  setArcRotation: (coord: Delta) => void;
  setArcRadiusX: (coord: Delta) => void;
  setArcRadiusY: (coord: Delta) => void;
  setArcStartPoint: (coord: Delta) => void;
  setArcEndPoint: (coord: Delta) => void;
} & {
  style: Style;
  fullScreen?: boolean;
};

export const EmbedArc: React.FC<EmbedArcProps> = ({
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
  style,
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
    <Embed id="embedArc" link="/editor/arc" fullScreen={fullScreen}>
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
          d={`
              M ${x1} ${y1}
              A ${rx} ${ry} ${degree}
              ${+largeArcFlag} ${+sweepFlag},
              ${x2} ${y2}`}
          {...style}
        />
        <DragRotation
          id="control-rotation"
          x={angleDragX}
          y={angleDragY}
          degree={degree}
          moveCoord={setArcRotation}
        />
        <DragDistance
          id="control-radius-x"
          x={rxDragX}
          y={rxDragY}
          degree={degree + 90}
          distance={rx}
          moveCoord={setArcRadiusX}
        />
        <DragDistance
          id="control-radius-y"
          x={ryDragX}
          y={ryDragY}
          degree={degree}
          distance={ry}
          moveCoord={setArcRadiusY}
        />
        <DragMove
          id="control-start"
          x={x1}
          y={y1}
          moveCoord={setArcStartPoint}
        />
        <DragMove id="control-end" x={x2} y={y2} moveCoord={setArcEndPoint} />
      </Canvas>
      <Code>
        <Path>
          <ValueSegment value="M" />
          <ValueSegment
            id="value-start"
            description="Start Position"
            value={`${round(x1)} ${round(y1)}`}
          />
          <ValueSegment value="A" />
          <ValueSegment
            id="value-radius-x"
            description="Radius X"
            value={`${round(rx)}`}
          />
          <ValueSegment
            id="value-radius-y"
            description="Radius Y"
            value={`${round(ry)}`}
          />
          <ValueSegment
            id="value-rotation"
            description="Rotation"
            value={`${round(degree)}`}
          />
          <ValueSegment
            id="value-large-arc-flag"
            description="Large Arc Flag"
            value={`${+largeArcFlag}`}
          />
          <ValueSegment
            id="value-sweep-flag"
            description="Sweep Flag"
            value={`${+sweepFlag}`}
          />
          <ValueSegment
            id="value-end"
            description="End Position"
            value={`${round(x2)} ${round(y2)}`}
          />
        </Path>
      </Code>
    </Embed>
  );
};
