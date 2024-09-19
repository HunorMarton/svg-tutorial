import * as React from "react";
import "./CodeAttributeValueSegment.css";

interface CodeAttributeValueSegmentProps {
  id?: string;
  description?: string;
  value: string;
}

export const CodeAttributeValueSegment: React.FC<
  CodeAttributeValueSegmentProps
> = ({ id, description, value }) => (
  <span id={id} className="value-segment">
    {value}
    {description && <div className="value-description">{description}</div>}
  </span>
);
