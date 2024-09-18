import * as React from "react";
import { Tag } from "./CodeTag.tsx";
import { Attribute } from "./CodeAttribute.tsx";
import "./Code.css";

interface CodeProps {
  children: string | React.ReactNode;
}

export const Code: React.FC<CodeProps> = ({ children }) => (
  <pre className="code">
    <code>
      <div>
        <Tag type="opening">svg</Tag>
        <Attribute width="450" />
        <Attribute height="450" />
        {">"}
      </div>
      <div className="level1">
        <Tag type="opening">path</Tag>
      </div>
      <div className="level2">
        <Attribute d={children} />
        {"\n"}
        <Attribute stroke="white" />
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
