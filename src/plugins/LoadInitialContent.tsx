import React, { FC } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateNodesFromDOM } from '@lexical/html';
import { $createParagraphNode, $getRoot, $insertNodes } from 'lexical';

interface LoadInitialContentProps {}

const LoadInitialContent: FC<LoadInitialContentProps> = ({}) => {
  const initialContent =
    '<p><span>Hi there</span></p><p dir="ltr"><span>ehsy eoulf br the time line</span></p>';

  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialContent, 'text/html');
      const nodes = $generateNodesFromDOM(editor, dom);
      console.log(dom, nodes);
      const paragraphNode = $createParagraphNode();

      nodes.forEach((n, i) => {
        console.log(`indes- ${i} : `, n);
        paragraphNode.append(n);
      });
      $getRoot().append(paragraphNode);
      // $getRoot().select();
      // $insertNodes([paragraphNode]);

      // const rootContent = $getRoot();
      // rootContent.(paragraphNode);
    });
  }, []);
  return null;
};

export default LoadInitialContent;
