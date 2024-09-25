import * as viewBox from "../constants/viewBoxSize";
import { round100 as round } from "./round";

export function overrideX(x: number, width: number) {
  const horizontalMargin = (width - viewBox.WIDTH) / 2;
  const minX = -horizontalMargin;
  const maxX = horizontalMargin + viewBox.WIDTH;

  let X = Math.min(x, maxX);
  X = Math.max(X, minX);
  X = round(X);
  return X;
}

export function overrideY(y: number, height: number) {
  const verticalMargin = (height - viewBox.HEIGHT) / 2;
  const minY = -verticalMargin;
  const maxY = verticalMargin + viewBox.HEIGHT;

  let Y = Math.min(y, maxY);
  Y = Math.max(Y, minY);
  Y = round(Y);
  return Y;
}
