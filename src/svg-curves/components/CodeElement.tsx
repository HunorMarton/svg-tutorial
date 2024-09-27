import * as React from "react";
import { Tag } from "./CodeTag.tsx";
import { CodeStyle } from "../connected/Style.tsx";
import "./Code.css";

interface ElementProps {
  element: string;
  content?: string;
  children: React.ReactNode;
}

export const Element: React.FC<ElementProps> = ({
  element,
  content,
  children,
}) => (
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
      <CodeStyle />
    </div>
    {!content ? (
      // Self-closing tag
      <div>
        {"  "}
        {"/>"}
      </div>
    ) : (
      // Tag with content
      <>
        <div>
          {"  "}
          {">"}
        </div>
        <div>
          {"  "}
          {"  "}
          {content}
        </div>
        <div>
          {"  "}
          <Tag type="closing">{element}</Tag>
        </div>
      </>
    )}
  </>
);
