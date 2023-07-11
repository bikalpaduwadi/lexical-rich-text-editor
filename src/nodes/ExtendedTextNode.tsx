import {
  $isTextNode,
  DOMConversion,
  DOMConversionMap,
  DOMConversionOutput,
  NodeKey,
  TextNode,
  SerializedTextNode
} from 'lexical';
import { $isPillNode } from './PillNode';

export class ExtendedTextNode extends TextNode {
  constructor(text: string, key?: NodeKey) {
    super(text, key);
  }

  static getType(): string {
    return 'extended-text';
  }

  static clone(node: ExtendedTextNode): ExtendedTextNode {
    return new ExtendedTextNode(node.__text, node.__key);
  }

  static importDOM(): DOMConversionMap | null {
    const importers = TextNode.importDOM();
    return {
      ...importers,
      span: (node) => (
        node.id !== 'custom-node' ? {
          conversion: patchStyleConversion(importers?.span),
          priority: 4
        } : null),
      strong: () => ({
        conversion: patchStyleConversion(importers?.strong),
        priority: 4
      }),
      em: () => ({
        conversion: patchStyleConversion(importers?.em),
        priority: 4
      })
    };
  }
}

function patchStyleConversion(
  originalDOMConverter?: (node: HTMLElement) => DOMConversion | null
): (node: HTMLElement) => DOMConversionOutput | null {
  return (node) => {
    const nodeClass = node.className

    const original = originalDOMConverter?.(node);
    if (!original) {
      return null;
    }
    const originalOutput = original.conversion(node);

    if (!originalOutput) {
      return originalOutput;
    }

    const backgroundColor = node.style.backgroundColor;
    const color = node.style.color;

    return {
      ...originalOutput,
      forChild: (lexicalNode, parent) => {
        const originalForChild = originalOutput?.forChild ?? ((x) => x);
        const result = originalForChild(lexicalNode, parent);
        if ($isTextNode(result)) {
          const style = [
            backgroundColor ? `background-color: ${backgroundColor}` : null,
            color ? `color: ${color}` : null
          ]
            .filter((value) => value != null)
            .join('; ');
          if (style.length) {
            // result.set
            return result.setStyle(style);
          }
        }
        return result;
      }
    };
  };
}
