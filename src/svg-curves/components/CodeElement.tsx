import * as React from "react";
import { Tag } from "./CodeTag.tsx";
import { Attribute } from "./CodeAttribute.tsx";
import "./Code.css";

interface ElementProps {
  element: string;
  children: React.ReactNode;
}

export const Element: React.FC<ElementProps> = ({ element, children }) => (
  <>
    <div>
      {"  "}
      <Tag type="opening">{element}</Tag>
    </div>
    <div>
      {"  "}
      {"  "}
      {children}
      {"\n"}
      {"  "}
      {"  "}
      <Attribute stroke="#fa3838" />
      <Attribute stroke-width="20" />
      <Attribute fill="none" />
    </div>
    <div>
      {"  "}
      {"/>"}
    </div>
  </>
);
