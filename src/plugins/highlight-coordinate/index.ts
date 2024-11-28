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
      annotateCode: (context) => {
        context.codeBlock.getLines().forEach((line, index) => {
          const coordinates = extractCoordinates(line.text);
          if (!coordinates.length) return;

          // console.log("coordinates:", index, coordinates);
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
        "span.coordinate",
        { dataX: this.coordinate.x, dataY: this.coordinate.y },
        node
      );
    });
  }
}
