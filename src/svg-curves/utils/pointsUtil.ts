import { type Point } from "../utils/types.ts";

export function parsePoints(value: string): Point[] {
  return value
    .replace(/,\s*/g, ",") // Remove spaces after commas
    .replace(/\s*,/g, ",") // Remove spaces before commas
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .trim() // Trim leading and trailing spaces
    .split(/[ ,]+/) // Split by space or comma
    .reduce((acc: Point[], val: string, idx: number, arr: string[]) => {
      if (idx % 2 === 0) {
        acc.push({ x: Number(val), y: Number(arr[idx + 1]) });
      }
      return acc;
    }, [])
    .filter(({ x, y }) => !isNaN(x) && !isNaN(y));
}
