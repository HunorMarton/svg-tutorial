import React, { useRef, useEffect } from "react";
import * as mainViewBox from "../constants/mainViewBoxSize.ts";
import "./Canvas.css";

interface CanvasProps {
  children: React.ReactNode;
  viewBoxWidth: number;
  viewBoxHeight: number;
  resize: ({ width, height }: { width: number; height: number }) => void;
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

  const crossSize = 20;
  const mainViewBoxMarginHorizontal =
    (props.viewBoxWidth - mainViewBox.WIDTH) / 2;
  const mainViewBoxMarginVertical =
    (props.viewBoxHeight - mainViewBox.HEIGHT) / 2;

  return (
    <svg
      viewBox={`0 0 ${props.viewBoxWidth} ${props.viewBoxHeight}`}
      className="canvas"
      ref={canvasRef}
    >
      <defs>
        <symbol id="cross">
          <line x1="1" y1="1" x2={crossSize} y2="1" />
          <line x1="1" y1="1" x2="1" y2={crossSize} />
        </symbol>
      </defs>
      <g
        transform={`translate(${mainViewBoxMarginHorizontal},${mainViewBoxMarginVertical})`}
      >
        <g className="canvasCorners">
          <use xlinkHref="#cross" x="-2" y="-2" />
          <g transform={`translate(${mainViewBox.WIDTH + 2}, -2)`}>
            <use xlinkHref="#cross" transform="rotate(90)" />
          </g>
          <g
            transform={`translate(${mainViewBox.WIDTH + 2}, ${
              mainViewBox.HEIGHT + 2
            })`}
          >
            <use xlinkHref="#cross" transform="rotate(180)" />
          </g>
          <g transform={`translate(-2, ${mainViewBox.HEIGHT + 2})`}>
            <use xlinkHref="#cross" transform="rotate(270)" />
          </g>
        </g>
        {props.children}
      </g>
    </svg>
  );
};
