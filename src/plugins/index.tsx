import { FC, useState } from 'react';
import { debounce } from 'lodash';
import { $generateHtmlFromNodes } from '@lexical/html';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import ToolbarPlugin from './ToolbarPlugin';
import useEditorState from '../hooks/useEditorState';
import PillPlugin from './PillPlugin';
import LoadInitialContent from './LoadInitialContent';
import LinkPlugin from './LinkPlugin';
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

      console.log(htmlString);

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
      <PillPlugin />
      <ToolbarPlugin />
    </>
  );
};

export default EditorPlugins;
