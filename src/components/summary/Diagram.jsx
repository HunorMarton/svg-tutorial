export function Diagram() {
  const dataPoints = [3, 4, 7, 5, 3, 6];

  return (
    <svg width="200" height="200">
      {dataPoints.map((dataPoint, index) => (
        <rect
          key={index}
          x={42.5 + index * 20}
          y={150 - dataPoint * 10}
          width="15"
          height={dataPoint * 10}
          fill="#CD803D"
        />
      ))}
    </svg>
  );
}
