import React, { useRef, useEffect } from "react";
import { type Size } from "../../utils/types";
import * as viewBox from "../../constants/viewBoxSize";
import "./Canvas.css";

interface CanvasProps {
  children: React.ReactNode;
  viewBoxWidth: number;
  viewBoxHeight: number;
  resize: (size: Size) => void;
}

export const Canvas: React.FC<CanvasProps> = (props) => {
  const canvasRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        props.resize({ width, height });
      }
    });

    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    return () => {
      if (canvasRef.current) {
        resizeObserver.unobserve(canvasRef.current);
      }
    };
  }, [props.resize]);

  const cornerSize = 20;
  const viewBoxMarginX = (props.viewBoxWidth - viewBox.WIDTH) / 2;
  const viewBoxMarginY = (props.viewBoxHeight - viewBox.HEIGHT) / 2;

  return (
    <svg
      viewBox={`0 0 ${props.viewBoxWidth} ${props.viewBoxHeight}`}
      className="canvas"
      ref={canvasRef}
    >
      <defs>
        <symbol id="corner">
          <line x1="1" y1="1" x2={cornerSize} y2="1" />
          <line x1="1" y1="1" x2="1" y2={cornerSize} />
        </symbol>
      </defs>
      <g transform={`translate(${viewBoxMarginX},${viewBoxMarginY})`}>
        <g className="canvasCorners">
          <use xlinkHref="#corner" x="-2" y="-2" />
          <g transform={`translate(${viewBox.WIDTH + 2}, -2)`}>
            <use xlinkHref="#corner" transform="rotate(90)" />
          </g>
          <g
            transform={`translate(${viewBox.WIDTH + 2}, ${viewBox.HEIGHT + 2})`}
          >
            <use xlinkHref="#corner" transform="rotate(180)" />
          </g>
          <g transform={`translate(-2, ${viewBox.HEIGHT + 2})`}>
            <use xlinkHref="#corner" transform="rotate(270)" />
          </g>
        </g>
        {props.children}
      </g>
    </svg>
  );
};
