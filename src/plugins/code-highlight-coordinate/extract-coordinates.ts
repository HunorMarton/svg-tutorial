export default function extractCoordinates(line: string) {
  const coordinates = [];
  let match;

  // Match M, L, Q, C commands
  const regex =
    /([MLQC])\s*(-?[\d.]+)[,\s]+(-?[\d.]+)(?:[,\s]+(-?[\d.]+)[,\s]+(-?[\d.]+))?(?:[,\s]+(-?[\d.]+)[,\s]+(-?[\d.]+))?/g;

  while ((match = regex.exec(line)) !== null) {
    const command = match[1];
    const x1 = parseFloat(match[2]);
    const y1 = parseFloat(match[3]);

    const startX1 = match[0].indexOf(match[2]);
    const endX1 = startX1 + match[2].length;
    const startY1 = match[0].indexOf(match[3], endX1);
    const endY1 = startY1 + match[3].length;

    coordinates.push({
      command,
      x: x1,
      y: y1,
      start: match.index + startX1,
      end: match.index + endY1,
    });

    if (command === "Q" || command === "C") {
      const x2 = parseFloat(match[4]);
      const y2 = parseFloat(match[5]);

      const startX2 = match[0].indexOf(match[4], endY1);
      const endX2 = startX2 + match[4].length;
      const startY2 = match[0].indexOf(match[5], endX2);
      const endY2 = startY2 + match[5].length;

      coordinates.push({
        command,
        x: x2,
        y: y2,
        start: match.index + startX2,
        end: match.index + endY2,
      });

      if (command === "C") {
        const x3 = parseFloat(match[6]);
        const y3 = parseFloat(match[7]);

        const startX3 = match[0].indexOf(match[6], endY2);
        const endX3 = startX3 + match[6].length;
        const startY3 = match[0].indexOf(match[7], endX3);
        const endY3 = startY3 + match[7].length;

        coordinates.push({
          command,
          x: x3,
          y: y3,
          start: match.index + startX3,
          end: match.index + endY3,
        });
      }
    }
  }

  // Match A commands
  const arcRegex =
    /A\s*(-?[\d.]+)[,\s]+(-?[\d.]+)[,\s]+(-?[\d.]+)[,\s]+(0|1)[,\s]+(0|1)[,\s]+(-?[\d.]+)[,\s]+(-?[\d.]+)/g;

  while ((match = arcRegex.exec(line)) !== null) {
    const command = "A";
    const rx = parseFloat(match[1]);
    const ry = parseFloat(match[2]);
    const xAxisRotation = parseFloat(match[3]);
    const largeArcFlag = parseInt(match[4]);
    const sweepFlag = parseInt(match[5]);
    const x = parseFloat(match[6]);
    const y = parseFloat(match[7]);

    // rx ry
    const startRx = match[0].indexOf(match[1]);
    const endRx = startRx + match[1].length;
    const startRy = match[0].indexOf(match[2], endRx);
    const endRy = startRy + match[2].length;

    // rotation
    const startRotation = match[0].indexOf(match[3], endRy);
    const endRotation = startRotation + match[3].length;

    // large arc flag
    const startLargeArc = match[0].indexOf(match[4], endRotation);
    const endLargeArc = startLargeArc + match[4].length;

    // sweep flag
    const startSweep = match[0].indexOf(match[5], endLargeArc);
    const endSweep = startSweep + match[5].length;

    // x y
    const startX = match[0].indexOf(match[6], endSweep);
    const endX = startX + match[6].length;
    const startY = match[0].indexOf(match[7], endX);
    const endY = startY + match[7].length;

    coordinates.push({
      command,
      x,
      y,
      start: match.index + startX,
      end: match.index + endY,
    });
  }

  return coordinates;
}
