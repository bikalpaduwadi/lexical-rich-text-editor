import { FC, useCallback, useEffect, useState } from 'react';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { INSERT_PILL_COMMAND } from '../PillPlugin';

interface ToolbarPluginProps {}

const ToolbarPlugin: FC<ToolbarPluginProps> = ({}) => {
  const [editor] = useLexicalComposerContext();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, [editor]);

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        $updateToolbar();
      });
    });
  }, [$updateToolbar, editor]);

  return (
    <div className='toolbar'>
      <button
        disabled={false}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
        title={'Bold (Ctrl+B)'}
        type='button'
        aria-label={`Format text as bold. Shortcut: ${'Ctrl+B'}`}
      >
        <i className='format bold' />
      </button>
      <button
        disabled={false}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
        title={'Italic (Ctrl+I)'}
        type='button'
        aria-label={`Format text as italics. Shortcut: ${'Ctrl+I'}`}
      >
        <i className='format italic' />
      </button>
      <button
        disabled={false}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
        title={'Underline (Ctrl+U)'}
        type='button'
        aria-label={`Format text to underlined. Shortcut: ${'Ctrl+U'}`}
      >
        <i className='format underline' />
      </button>
      <button
        disabled={false}
        onClick={() => {
          editor.dispatchCommand(INSERT_PILL_COMMAND, 'Hi there');
        }}
        className={'toolbar-item spaced '}
        title={'Add Pill'}
        type='button'
      >
        Add Pill
      </button>
    </div>
  );
};

export default ToolbarPlugin;
