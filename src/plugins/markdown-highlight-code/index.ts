import { visit } from "unist-util-visit";

export default function customCode() {
  return (tree: any) => {
    visit(tree, "inlineCode", (node, index, parent) => {
      const match = /^(element|property|value):(.+)$/.exec(node.value);
      if (match) {
        const [, codeType, codeValue] = match;

        const codeNode = {
          type: "html",
          value: `<code class=${codeType}>${codeValue}</code>`,
        };

        parent.children.splice(index, 1, codeNode);
      }
    });
  };
}
