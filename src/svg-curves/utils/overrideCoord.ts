import * as viewBox from "../constants/viewBoxSize";
import { round100 as round } from "./round";

export default function overrideCoord({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  const horizontalMargin = (width - viewBox.WIDTH) / 2;
  const verticalMargin = (height - viewBox.HEIGHT) / 2;
  const minX = -horizontalMargin;
  const maxX = horizontalMargin + viewBox.WIDTH;
  const minY = -verticalMargin;
  const maxY = verticalMargin + viewBox.HEIGHT;

  let X = Math.min(x, maxX);
  let Y = Math.min(y, maxY);
  X = Math.max(X, minX);
  Y = Math.max(Y, minY);
  X = round(X);
  Y = round(Y);
  return { x: X, y: Y };
}
