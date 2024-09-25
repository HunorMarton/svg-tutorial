import * as React from "react";
import "./CodeHighlight.css";

interface HighlightProps {
  id?: string;
  description?: string;
  children: React.ReactNode;
}

export const Highlight: React.FC<HighlightProps> = ({
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
