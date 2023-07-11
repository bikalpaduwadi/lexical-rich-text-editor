import React, { FC } from 'react';
import { $generateNodesFromDOM } from '@lexical/html';
import { $createParagraphNode, $getRoot } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface LoadInitialContentProps { }

const LoadInitialContent: FC<LoadInitialContentProps> = ({ }) => {
  const initialContent =
    '<p dir="ltr"><p dir="ltr"><span>Hi </span><b><strong class="EditorTheme__textBold">{Team Member Name}</strong></b><span>,</span></p><p dir="ltr"><span>This is a </span><a href="https://lexical.dev/" rel="noopener"><span style="color: rgb(144, 19, 254);">Lexical</span></a><span> text editor, We are testing it as a potential replacement for </span><span style="background-color: rgb(80, 227, 194);">rich text editor</span><span> in </span><u><b><strong class="EditorTheme__textBold EditorTheme__textUnderline" style="color: rgb(74, 144, 226);">LAUDIO</strong></b></u><u><b><strong class="EditorTheme__textBold EditorTheme__textUnderline">.</strong></b></u></p><p><span id="custom-node">Manager_Preferred_Name</span></p><p dir="ltr"><span>Good luck!</span></p><p><br></p><p><br></p><p><br></p></p>';
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
      // rootContent.(paragraphNode);]
    });

    return () => {
      editor.update(() => {
        $getRoot().clear();
      });
    };
  }, []);
  return null;
};

export default LoadInitialContent;
