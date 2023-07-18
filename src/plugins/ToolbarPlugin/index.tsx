import { FC, useCallback, useEffect, useState } from 'react';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  KEY_MODIFIER_COMMAND,
  COMMAND_PRIORITY_NORMAL,
} from 'lexical';
import {
  $patchStyleText,
  $getSelectionStyleValueForProperty,
} from '@lexical/selection';

import FontDropDown from './FontDropDown';
import { sanitizeUrl } from '../../utils/url';
import { INSERT_PILL_COMMAND } from '../PillPlugin';
import { $createPillNode } from '../../nodes/PillNode';
import PopOverContent from '../../components/PopOverContent';
import { getSelectedNode } from '../../utils/getSelectedNode';
import DropDownColorPicker from '../../ui/DropDownColorPicker';

interface ToolbarPluginProps {
  ModalWrapper: any
 }

const ToolbarPlugin: FC<ToolbarPluginProps> = (props) => {
  const [editor] = useLexicalComposerContext();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const [fontSize, setFontSize] = useState<string>('15px');
  const [fontFamily, setFontFamily] = useState<string>('Arial');

  const [fontColor, setFontColor] = useState<string>('#000');
  const [bgColor, setBgColor] = useState<string>('#fff');

  const [isLink, setIsLink] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      setFontSize(
        $getSelectionStyleValueForProperty(selection, 'font-size', '15px')
      );

      setFontFamily(
        $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial')
      );

      setFontColor(
        $getSelectionStyleValueForProperty(selection, 'color', '#000')
      );

      setBgColor(
        $getSelectionStyleValueForProperty(
          selection,
          'background-color',
          '#fff'
        )
      );
    }
  }, [editor]);

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        $updateToolbar();
      });
    });
  }, [$updateToolbar, editor]);

  useEffect(() => {
    return editor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload;
        const { code, ctrlKey, metaKey } = event;

        if (code === 'KeyK' && (ctrlKey || metaKey)) {
          event.preventDefault();
          return editor.dispatchCommand(
            TOGGLE_LINK_COMMAND,
            sanitizeUrl('https://')
          );
        }
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [editor, isLink]);

  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [editor]
  );

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ color: value });
    },
    [applyStyleText]
  );

  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ 'background-color': value });
    },
    [applyStyleText]
  );

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const handlePopOverChange = (value: any) => {
    console.log(value, 'i am value')
    editor.update(() => {
      const selection = $getSelection();
      if (selection !== null) {
        selection.insertNodes([$createPillNode(value)]);
      }
    });
  }

  const handleInsertData = (value: any) => {
    console.log('hello world')

    editor.update(() => {
      const selection = $getSelection();
      if (selection !== null) {
        selection.insertNodes([$createPillNode(value)]);
      }
    });
  }

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
          editor.dispatchCommand(INSERT_PILL_COMMAND, 'Manager_Preferred_Name');
        }}
        className={'toolbar-item spaced '}
        title={'Add Pill'}
        type='button'
      >
        Add Pill
      </button>
      <DropDownColorPicker
        disabled={false}
        color={fontColor}
        title='text color'
        onChange={onFontColorSelect}
        buttonIconClassName='icon font-color'
        buttonAriaLabel='Formatting text color'
        buttonClassName='toolbar-item color-picker'
      />
      <DropDownColorPicker
        disabled={false}
        buttonClassName='toolbar-item color-picker'
        buttonAriaLabel='Formatting background color'
        buttonIconClassName='icon bg-color'
        color={bgColor}
        onChange={onBgColorSelect}
        title='bg color'
      />
      <button
        disabled={false}
        onClick={insertLink}
        className={'toolbar-item spaced ' + (isLink ? 'active' : '')}
        aria-label='Insert link'
        title='Insert link'
        type='button'
      >
        <i className='format link' />
      </button>
      <PopOverContent value='guardians' onSelect={handlePopOverChange} />
      {props.ModalWrapper({ handleInsertData })}
      <FontDropDown
        disabled={false}
        style={'font-family'}
        value={fontFamily}
        editor={editor}
      />
      <FontDropDown
        disabled={false}
        style={'font-size'}
        value={fontSize}
        editor={editor}
      />
    </div>
  );
};

export default ToolbarPlugin;
