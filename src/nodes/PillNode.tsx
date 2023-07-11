import {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  DecoratorNode,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';

import PillComponent from './PillComponent';

type SerializedPillNode = Spread<{
  displayText: string;
}, SerializedLexicalNode>

export class PillNode extends DecoratorNode<JSX.Element> {
  __displayText: string;

  constructor(displayText: string, key?: NodeKey) {
    super(key);
    this.__displayText = displayText;
  }

  static getType(): string {
    return 'pill';
  }

  static clone(node: PillNode): PillNode {
    return new PillNode(node.__displayText, node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = theme.pill;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  getDisplayText(): string {
    return this.__displayText;
  }

  updateDOM(): false {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('span');
    element.id = 'custom-node';
    element.innerHTML = this.__displayText;
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (node: Node) => ({
        conversion: convertPillElement,
        priority: 4
      }),
    };
  }

  exportJSON(): SerializedPillNode {
    return {
      displayText: this.__displayText,
      type: "pill",
      version: 1,
    };
  }

  decorate(): JSX.Element {
    return <PillComponent displayText={this.__displayText} />;
  }
}

function convertPillElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLSpanElement) {
    if (domNode.textContent === 'Manager_Preferred_Name') {
      const node = $createPillNode(domNode.textContent || '');
      return { node };
    }
  }
  return null;
}

export function $createPillNode(displayText: string): PillNode {
  return new PillNode(displayText);
}

export function $isPillNode(node: LexicalNode): boolean {
  return node instanceof PillNode;
}
