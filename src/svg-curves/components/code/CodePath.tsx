import * as React from "react";
import { Element } from "./CodeElement.tsx";
import { Attribute } from "./CodeAttribute.tsx";
import "./Code.css";

interface PathProps {
  children: React.ReactNode;
}

export const Path: React.FC<PathProps> = ({ children }) => (
  <Element element="path">
    <Attribute d={children} />
  </Element>
);
