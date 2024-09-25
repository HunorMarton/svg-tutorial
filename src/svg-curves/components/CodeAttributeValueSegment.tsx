import * as React from "react";
import { Highlight } from "./CodeHighlight";
import "./CodeAttributeValueSegment.css";

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
  <span className="value-segment">
    <Highlight id={id} description={description}>
      {value}
    </Highlight>
  </span>
);
