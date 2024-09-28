import React from "react";
import "./CanvasCorners.css";

export const CanvasCorners: React.FC = () => {
  const cornerSize = 20;

  return (
    <g className="canvas-corners">
      <defs>
        <symbol id="corner">
          <line x1="1" y1="1" x2={cornerSize} y2="1" />
          <line x1="1" y1="1" x2="1" y2={cornerSize} />
        </symbol>
      </defs>
      <use xlinkHref="#corner" />
      <use xlinkHref="#corner" />
      <use xlinkHref="#corner" />
      <use xlinkHref="#corner" />
    </g>
  );
};

export default CanvasCorners;
