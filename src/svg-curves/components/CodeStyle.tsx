import * as React from "react";
import { Attribute } from "./CodeAttribute.tsx";
import { type Style } from "../utils/types";

export const CodeStyle: React.FC<Style> = ({
  stroke,
  strokeWidth,
  strokeLinecap,
  strokeLinejoin,
  fill,
}) => (
  <>
    {stroke !== "none" && <Attribute stroke={stroke} />}
    {strokeWidth !== 0 && <Attribute stroke-width={strokeWidth} />}
    {fill !== "black" && <Attribute fill={fill} />}

    {(strokeLinecap !== "butt" || strokeLinejoin !== "miter") && (
      <>
        {"\n"}
        {"  "}
        {"  "}
        {strokeLinecap !== "butt" && (
          <Attribute stroke-linecap={strokeLinecap} />
        )}
        {strokeLinejoin !== "miter" && (
          <Attribute stroke-linejoin={strokeLinejoin} />
        )}
      </>
    )}
  </>
);
