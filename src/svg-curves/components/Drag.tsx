import React, { useEffect } from "react";
import { merge, fromEvent } from "rxjs";
import { map, filter, switchMap, takeUntil, pairwise } from "rxjs/operators";
import { type Delta } from "../utils/types";
import { round } from "../utils/round";
import "./Drag.css";

interface DragProps {
  id?: string;
  children: React.ReactNode;
  x: number;
  y: number;
  moveCoord: (coord: Delta) => void;
  desc?: string;
}

export const Drag: React.FC<DragProps> = ({
  id,
  children,
  x,
  y,
  moveCoord,
  desc,
}) => {
  const [dragging, setDragging] = React.useState(false);
  const size = 40;
  const draggableRef = React.useRef<SVGGElement>(null);

  useEffect(() => {
    if (!draggableRef.current) return;

    const mouseEventToCoordinate = (mouseEvent: MouseEvent) => ({
      x: mouseEvent.clientX,
      y: mouseEvent.clientY,
    });
    const touchEventToCoordinate = (touchEvent: TouchEvent) => {
      touchEvent.preventDefault();
      return {
        x: touchEvent.touches[0].clientX,
        y: touchEvent.touches[0].clientY,
      };
    };

    // Mouse events
    const mouseDowns = fromEvent<MouseEvent>(
      draggableRef.current,
      "mousedown"
    ).pipe(
      filter((event) => event.button === 0) // Filter for left mouse button
    );
    const mouseMoves = fromEvent<MouseEvent>(window, "mousemove").pipe(
      map(mouseEventToCoordinate)
    );
    const mouseUps = fromEvent<MouseEvent>(window, "mouseup");

    // Touch events
    const touchStarts = fromEvent<TouchEvent>(
      draggableRef.current,
      "touchstart"
    );
    const touchMoves = fromEvent<TouchEvent>(
      draggableRef.current,
      "touchmove"
    ).pipe(map(touchEventToCoordinate));
    const touchEnds = fromEvent<TouchEvent>(window, "touchend");

    // Universal events
    const dragStarts = merge(mouseDowns, touchStarts);
    const moves = merge(mouseMoves, touchMoves);
    const dragEnds = merge(mouseUps, touchEnds);

    const drags = dragStarts.pipe(
      switchMap((dragStartEvent) =>
        moves.pipe(
          takeUntil(dragEnds),
          pairwise(),
          map(([prev, curr]) => {
            const dx = curr.x - prev.x;
            const dy = curr.y - prev.y;
            return { dx, dy };
          }),
          filter(({ dx, dy }) => dx !== 0 || dy !== 0)
        )
      )
    );

    const subscription1 = dragStarts.subscribe(() => {
      setDragging(true);
    });

    const subscription2 = drags.subscribe((delta) => {
      moveCoord(delta);
    });

    const subscription3 = dragEnds.subscribe(() => {
      setDragging(false);
    });

    return () => {
      subscription1.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
    };
  }, [moveCoord]);

  return (
    <g
      id={id}
      className={dragging ? "dragging" : "draggable"}
      ref={draggableRef}
      transform={`translate(${x},${y})`}
    >
      <circle x={-size / 2} y={-size / 2} r={size / 2} />
      {children}
      <text x={size / 2} y={-size / 2} textAnchor="left" stroke="none">
        {desc ? desc : `${round(x)}, ${round(y)}`}
      </text>
    </g>
  );
};
