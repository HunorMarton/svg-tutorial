import { definePlugin } from "@expressive-code/core";
import { setProperty } from "@expressive-code/core/hast";

import baseStyles from "./style.ts";
import module from "./module.js";

// import * as all from "@expressive-code/core/hast";
// console.log("all", all);

function detectElementStart(line: string, elements: string[]) {
  return elements.find((element) => line.trim().startsWith(`<${element}`));
}

function detectElementEnd(line: string) {
  return line.trim().endsWith(`/>`);
}

export interface PluginSVGProps {
  elements: string[];
}

declare module "@expressive-code/core" {
  export interface ExpressiveCodeBlockProps extends PluginSVGProps {}
}

export function highlightElementPlugin(elements: string[]) {
  return definePlugin({
    name: "Add section id to lines",
    jsModules: [module],
    baseStyles,
    hooks: {
      preprocessCode: ({ codeBlock }) => {
        // Indicates the current element type
        let type: string | undefined = undefined;

        // Counts how many elements of each type have been found so far
        let elementCounter: {
          [key: string]: number;
        } = {};

        // Go through each line and log the element type
        codeBlock.getLines().forEach((line, index) => {
          // If no element found so far, then check if the line starts with an element
          if (!type) {
            type = detectElementStart(line.text, elements);
            if (!type) return; // Return if no new element found

            // Increase the counter for the element type
            elementCounter[type] = (elementCounter[type] ?? 0) + 1;
          }

          // Log element for the line with a counter
          codeBlock.props.elements ??= [];
          codeBlock.props.elements[index] = `${type}-${elementCounter[type]}`;

          // If the elements ends in this line then reset the element type
          const end = detectElementEnd(line.text);
          if (end) type = undefined;
        });

        // console.log(codeBlock.props.elements);
      },

      postprocessRenderedLine: (context) => {
        if (context.codeBlock.props.elements?.[context.lineIndex]) {
          setProperty(
            context.renderData.lineAst,
            "data-element-id",
            context.codeBlock.props.elements[context.lineIndex]
          );
        }
      },
    },
  });
}
