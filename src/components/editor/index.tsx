import { useEffect } from 'react';

import { TextNode } from 'lexical';
import {} from '@lexical/clipboard';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// import EditorPlugins from './EditorPlugins';
import EditorPlugins from '../../plugins';
import { PillNode } from '../../nodes/PillNode';
import { ImageNode } from '../../nodes/ImageNode';
import EditorTheme from '../../themes/EditorTheme';
import ActionsPlugin from '../../plugins/ActionsPlugin';
import { ExtendedTextNode } from '../../nodes/ExtendedTextNode';

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

function onError(error: any) {
  throw error;
}

const Index = ({}) => {
  const initialConfig = {
    namespace: 'RichTextEditor',
    nodes: [
      ExtendedTextNode,
      {
        replace: TextNode,
        with: (node: TextNode) => new ExtendedTextNode(node.__text, node.__key),
      },
      PillNode,
      LinkNode,
      ImageNode,
      AutoLinkNode,
    ],
    theme: EditorTheme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ActionsPlugin />
      <div className='editor-shell'>
        <EditorPlugins />
        <MyCustomAutoFocusPlugin />
      </div>
      <HistoryPlugin />
    </LexicalComposer>
  );
};

export default Index;
