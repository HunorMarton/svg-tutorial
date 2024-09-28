import React, { useRef, useEffect } from "react";
import { type Size } from "../../utils/types";
import CanvasCorners from "./CanvasCorners";
import "./Canvas.css";

interface CanvasProps {
  children: React.ReactNode;
  viewBoxWidth: number | undefined;
  viewBoxHeight: number | undefined;
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

  return (
    <svg
      viewBox={
        props.viewBoxWidth && props.viewBoxHeight
          ? `0 0 ${props.viewBoxWidth} ${props.viewBoxHeight}`
          : undefined
      }
      className="canvas"
      ref={canvasRef}
    >
      <g className="canvas-main">
        <CanvasCorners />
        {props.children}
      </g>
    </svg>
  );
};
