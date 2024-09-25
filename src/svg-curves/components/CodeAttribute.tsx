import * as React from "react";
import { Highlight } from "./CodeHighlight";
import "./Code.css";

interface AttributeProps {
  id?: string;
  description?: string;
  [key: string]: string | React.ReactNode;
}

export const Attribute: React.FC<AttributeProps> = ({
  id,
  description,
  ...props
}) => {
  const [key, value] = Object.entries(props)[0];

  return (
    <span className="space-separated">
      <Highlight id={id} description={description}>
        <span className="key">{key}</span>
        {"="}
        <span className="value">"{value}"</span>
      </Highlight>
      <span className="space"> </span>
    </span>
  );
};
