import { type Point } from "../utils/types.ts";

export function parsePoints(value: string): Point[] {
  const stripped = stripValue(value)
    .split(" ")
    .filter((value) => !isNaN(Number(value)));

  return stripped.reduce(
    (acc: Point[], val: string, idx: number, arr: string[]) => {
      if (idx % 2 === 0) {
        acc.push({ x: Number(val), y: Number(arr[idx + 1]) });
      }
      return acc;
    },
    []
  );
}

export function stripValue<T extends string | number>(value: T): T {
  if (typeof value === "string") {
    return value.replace(/,+/g, " ").replace(/\s+/g, " ") as T;
  }
  return value;
}
