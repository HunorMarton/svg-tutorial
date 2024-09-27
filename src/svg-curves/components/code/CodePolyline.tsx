import * as React from "react";
import { Element } from "./CodeElement.tsx";
import { Attribute } from "./CodeAttribute.tsx";
import "./Code.css";

interface PolylineProps {
  children: React.ReactNode;
}

export const Polyline: React.FC<PolylineProps> = ({ children }) => (
  <Element element="polyline">
    <Attribute points={children} />
  </Element>
);
