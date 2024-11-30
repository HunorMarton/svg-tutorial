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

export interface PluginProps {
  elements: string[]; // Element ids for each line by line index
}

declare module "@expressive-code/core" {
  export interface ExpressiveCodeBlockProps extends PluginProps {}
}

export function highlightElementPlugin(elements: string[]) {
  return definePlugin({
    name: "Annotate element id for the lines",
    jsModules: [module],
    baseStyles,
    hooks: {
      preprocessCode: ({ codeBlock }) => {
        // Only process html code blocks
        if (codeBlock.language !== "html") return;
        // Ignore code blocks with the `ignore-highlight` meta
        if (codeBlock.meta.includes("ignore-highlight")) return;

        // Current line element type
        let type: string | undefined = undefined;

        // Counts how many elements of each type have been found so far
        let elementCounter: {
          [key: string]: number;
        } = {};

        // Go through each line and mark the element type
        codeBlock.getLines().forEach((line, index) => {
          // If no element found so far, then check if the line starts with an element
          if (!type) {
            type = detectElementStart(line.text, elements);
            if (!type) return; // Return if no element found

            // Increase the counter for the element type
            elementCounter[type] = (elementCounter[type] ?? 0) + 1;
          }

          // Mark element id for the line index
          const elementId = `${type}-${elementCounter[type]}`;
          codeBlock.props.elements ??= [];
          codeBlock.props.elements[index] = elementId;

          // If the elements ends in this line then clear the element type
          const end = detectElementEnd(line.text);
          if (end) type = undefined;
        });
      },

      postprocessRenderedLine: ({ codeBlock, renderData, lineIndex }) => {
        // Only process html code blocks
        if (codeBlock.language !== "html") return;
        // Ignore code blocks with the `ignore-highlight` meta
        if (codeBlock.meta.includes("ignore-highlight")) return;

        // Set the element id to the line
        if (codeBlock.props.elements?.[lineIndex]) {
          setProperty(
            renderData.lineAst,
            "data-element-id",
            codeBlock.props.elements[lineIndex]
          );
        }
      },
    },
  });
}
