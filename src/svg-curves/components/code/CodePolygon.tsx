import * as React from "react";
import { Element } from "./CodeElement.tsx";
import { Attribute } from "./CodeAttribute.tsx";
import "./Code.css";

interface PolygonProps {
  children: React.ReactNode;
}

export const Polygon: React.FC<PolygonProps> = ({ children }) => (
  <Element element="polygon">
    <Attribute points={children} />
  </Element>
);
