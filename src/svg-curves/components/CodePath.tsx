import * as React from "react";
import { CodeElement as Element } from "./CodeElement.tsx";
import { Attribute } from "./CodeAttribute.tsx";
import "./Code.css";

interface CodePathProps {
  children: React.ReactNode;
}

export const CodePath: React.FC<CodePathProps> = ({ children }) => (
  <Element element="path">
    <Attribute d={children} />
  </Element>
);
