import * as React from "react";
import "./CodeAttributeValueSegment.css";

interface CodeAttributeValueSegmentProps {
  id?: string;
  value: string;
}

export const CodeAttributeValueSegment: React.FC<
  CodeAttributeValueSegmentProps
> = ({ id, value }) => (
  <span id={id} className="value-segment">
    {value}
  </span>
);
