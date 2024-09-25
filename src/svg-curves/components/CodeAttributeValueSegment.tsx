import * as React from "react";
import { CodeHighlight as Highlight } from "./CodeHighlight";
import "./CodeAttributeValueSegment.css";

interface CodeAttributeValueSegmentProps {
  id?: string;
  description?: string;
  value: string;
}

export const CodeAttributeValueSegment: React.FC<
  CodeAttributeValueSegmentProps
> = ({ id, description, value }) => (
  <span className="value-segment">
    <Highlight id={id} description={description}>
      {value}
    </Highlight>
  </span>
);
