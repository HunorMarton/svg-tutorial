import * as React from "react";
import "./CodeHighlight.css";

interface CodeHighlightProps {
  id?: string;
  description?: string;
  children: React.ReactNode;
}

export const CodeHighlight: React.FC<CodeHighlightProps> = ({
  id,
  description,
  children,
}) => {
  if (!id) {
    return <>{children}</>;
  }

  return (
    <span id={id} className="highlight">
      {children}
      <div className="highlight-description">{description}</div>
    </span>
  );
};
