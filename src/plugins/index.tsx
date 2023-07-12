import { debounce } from 'lodash';
import { FC, useState } from 'react';
import { $generateHtmlFromNodes } from '@lexical/html';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import PillPlugin from './PillPlugin';
import LinkPlugin from './LinkPlugin';
import ImagePlugin from './ImagePlugin';
import ToolbarPlugin from './ToolbarPlugin';
import useEditorState from '../hooks/useEditorState';
import LoadInitialContent from './LoadInitialContent';
import DragDropPastePlugin from './DragDropPastePlugin';
import FloatingLinkEditorPlugin from './FloatingLinkEditorPlugin';

interface EditorPluginsProps {}

const EditorPlugins: FC<EditorPluginsProps> = ({}) => {
  const { setValue } = useEditorState();
  const [editor] = useLexicalComposerContext();

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const onChange = (editorState: any) => {
    editorState.read(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);

      setValue(htmlString);
    });
  };

  const debounceChange = debounce(onChange, 300);

  return (
    <>
      <div className='editor-container'>
        <LoadInitialContent />
        <RichTextPlugin
          contentEditable={
            <div className='editor-scroller'>
              <div className='editor' ref={onRef}>
                <ContentEditable className='ContentEditable__root' />
              </div>
            </div>
          }
          placeholder={<div className={'Placeholder__root'}>Enter Text</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={debounceChange} />
      </div>
      <LinkPlugin />
      {floatingAnchorElem && (
        <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
      )}
      <DragDropPastePlugin />
      <ImagePlugin />
      <PillPlugin />
      <ToolbarPlugin />
    </>
  );
};

export default EditorPlugins;
