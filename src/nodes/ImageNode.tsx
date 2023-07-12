import {
  Spread,
  NodeKey,
  LexicalNode,
  EditorConfig,
  DecoratorNode,
  DOMExportOutput,
  DOMConversionMap,
  DOMConversionOutput,
  $applyNodeReplacement,
  SerializedLexicalNode,
} from 'lexical';

import ImageComponent from './ImageComponent';

export interface ImagePayload {
  src: string;
  key?: NodeKey;
  width?: number;
  altText: string;
  height?: number;
  maxWidth?: number;
}

export type SerializedImageNode = Spread<
  {
    src: string;
    width?: number;
    altText: string;
    height?: number;
    maxWidth: number;
  },
  SerializedLexicalNode
>;

function convertImageElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLImageElement) {
    const { alt: altText, src, width, height } = domNode;
    const node = $createImageNode({ altText, height, src, width });
    return { node };
  }
  return null;
}

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width: 'inherit' | number;
  __height: 'inherit' | number;
  __maxWidth: number;

  static getType(): string {
    return 'image';
  }

  constructor(
    src: string,
    altText: string,
    maxWidth: number,
    width?: 'inherit' | number,
    height?: 'inherit' | number,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__width = width || 200;
    this.__height = height || 200;
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__maxWidth,
      node.__width,
      node.__height,
      node.__key
    );
  }

  // View
  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <ImageComponent
        resizable={true}
        src={this.__src}
        width={this.__width}
        height={this.__height}
        nodeKey={this.getKey()}
        altText={this.__altText}
        maxWidth={this.__maxWidth}
      />
    );
  }

  setWidthAndHeight(
    width: 'inherit' | number,
    height: 'inherit' | number
  ): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('img');
    element.setAttribute('src', this.__src);
    element.setAttribute('alt', this.__altText);
    element.setAttribute('width', this.__width.toString());
    element.setAttribute('height', this.__height.toString());
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (_: Node) => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    };
  }

  exportJSON(): SerializedImageNode {
    return {
      version: 1,
      type: 'image',
      src: this.getSrc(),
      maxWidth: this.__maxWidth,
      altText: this.getAltText(),
      height: this.__height === 'inherit' ? 0 : this.__height,
      width: this.__width === 'inherit' ? 0 : this.__width,
    };
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, altText, height, width, maxWidth } = serializedNode;
    const node = $createImageNode({
      src,
      width,
      height,
      altText,
      maxWidth,
    });

    return node;
  }
}

export function $createImageNode({
  key,
  src,
  width,
  height,
  altText,
  maxWidth = 500,
}: ImagePayload): ImageNode {
  return $applyNodeReplacement(
    new ImageNode(src, altText, maxWidth, width, height, key)
  );
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}
