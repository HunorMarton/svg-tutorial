import * as React from "react";
import { Highlight } from "./CodeHighlight";
import "./Code.css";

interface ValueSegmentProps {
  id?: string;
  description?: string;
  value: string;
}

export const ValueSegment: React.FC<ValueSegmentProps> = ({
  id,
  description,
  value,
}) => (
  <span className="value-segment space-separated">
    <Highlight id={id} description={description}>
      {value}
    </Highlight>
    <span className="space"> </span>
  </span>
);
