import * as React from "react";
import { Tag } from "./CodeTag.tsx";
import { Attribute } from "./CodeAttribute.tsx";
import "./Code.css";

interface CodeElementProps {
  element: string;
  children: React.ReactNode;
}

export const CodeElement: React.FC<CodeElementProps> = ({
  element,
  children,
}) => (
  <>
    <div className="level1">
      <Tag type="opening">{element}</Tag>
    </div>
    <div className="level2">
      {children}
      {"\n"}
      <Attribute stroke="#fa3838" />
      <Attribute stroke-width="20" />
      <Attribute fill="none" />
    </div>
    <div className="level1">{"/>"}</div>
  </>
);