import * as React from "react";

interface CodeValueProps {
  [key: string]: string;
}

export const Attribute: React.FC<CodeValueProps> = ({ children, ...props }) => {
  const [key, value] = Object.entries(props)[0];
  console.log(key, value);

  return (
    <span className="attribute">
      <span className="key">{key}</span>
      {"="}
      <span className="value">{`"${value}"`}</span>
    </span>
  );
};
