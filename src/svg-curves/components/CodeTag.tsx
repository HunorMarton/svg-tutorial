import * as React from "react";

interface TagProps {
  children: React.ReactNode;
  type: "opening" | "closing";
}

export const Tag: React.FC<TagProps> = ({ children, type }) => (
  <span>
    {type === "opening" && "<"}
    {type === "closing" && "</"}
    <span className="tag">{children}</span>
    {type === "opening" && " "}
    {type === "closing" && ">"}
  </span>
);
