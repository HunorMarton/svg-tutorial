import React from "react";
import { track } from "../../../utils/analytics";
import { ArrowHead } from "../canvas/ArrowHead";
import "./ExpandButton.css";

const size = 30;

interface ExpandButtonProps {
  link: string;
}

export const ExpandButton: React.FC<ExpandButtonProps> = ({ link }) => (
  <a
    href={link}
    aria-label="Go to Editor"
    className="expandButton"
    onClick={() => track("Expand", { to: link })}
  >
    <svg width={size} height={size}>
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle r={size / 2} />
        <g transform="rotate(45)">
          <ArrowHead x={0} y={-7} rotation={0} />
          <ArrowHead x={0} y={7} rotation={180} />
        </g>
      </g>
    </svg>
    <label>Go to Editor</label>
  </a>
);
