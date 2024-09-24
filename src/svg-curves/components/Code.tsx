import * as React from "react";
import * as viewBox from "../constants/viewBoxSize";
import { Tag } from "./CodeTag.tsx";
import { Attribute } from "./CodeAttribute.tsx";
import "./Code.css";

interface CodeProps {
  width: number;
  height: number;
  children: React.ReactNode;
}

export const Code: React.FC<CodeProps> = ({ width, height, children }) => (
  <pre className="code">
    <code>
      <div>
        <Tag type="opening">svg</Tag>
        <Attribute width={width} />
        <Attribute height={height} />
        {(width < viewBox.WIDTH || height < viewBox.HEIGHT) && (
          <Attribute viewBox={`0 0 ${viewBox.WIDTH} ${viewBox.HEIGHT}`} />
        )}
        {">"}
      </div>
      <div className="level1">
        <Tag type="opening">path</Tag>
      </div>
      <div className="level2">
        <Attribute d={children} />
        {"\n"}
        <Attribute stroke="#fa3838" />
        <Attribute stroke-width="20" />
        <Attribute fill="none" />
        {" />"}
      </div>
      <div>
        <Tag type="closing">svg</Tag>
      </div>
    </code>
  </pre>
);
