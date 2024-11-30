import {
  definePlugin,
  ExpressiveCodeAnnotation,
  type AnnotationRenderOptions,
} from "@expressive-code/core";
import { h } from "@expressive-code/core/hast";

import baseStyles from "./style.ts";
import extractCoordinates from "./extract-coordinates.ts";

export function highlightCoordinatePlugin() {
  return definePlugin({
    name: "Annotate coordinates",
    baseStyles,
    hooks: {
      annotateCode: ({ codeBlock }) => {
        // Only process html code blocks
        if (codeBlock.language !== "html") return;
        // Ignore code blocks with the `ignore-highlight` meta
        if (codeBlock.meta.includes("ignore-highlight")) return;

        codeBlock.getLines().forEach((line) => {
          const coordinates = extractCoordinates(line.text);
          if (!coordinates.length) return;

          coordinates.forEach((match) => {
            line.addAnnotation(
              new CoordinateAnnotation(
                {
                  columnStart: match.start,
                  columnEnd: match.end,
                },
                { x: match.x, y: match.y }
              )
            );
          });
        });
      },
    },
  });
}

// Annotation class that takes a coordinate and the range of the annotation
// then annotates the node with the coordinate data at the specified range
class CoordinateAnnotation extends ExpressiveCodeAnnotation {
  constructor(
    readonly inlineRange: { columnStart: number; columnEnd: number },
    readonly coordinate: { x: number; y: number }
  ) {
    super({ inlineRange });
  }

  render({ nodesToTransform }: AnnotationRenderOptions) {
    return nodesToTransform.map((node) => {
      return h(
        "span.coordinate", // Wrapping html element and class name
        { dataX: this.coordinate.x, dataY: this.coordinate.y }, // Assigned data attributes
        node
      );
    });
  }
}
