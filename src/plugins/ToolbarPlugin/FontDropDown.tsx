import { FC, useCallback } from 'react';
import { $patchStyleText } from '@lexical/selection';
import { $getSelection, $isRangeSelection, LexicalEditor } from 'lexical';
import DropDown from '../../ui/DropDown';
import { DropDownItem } from '../../ui/DropDownItems';

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ['Arial', 'Arial'],
  ['Courier New', 'Courier New'],
  ['Georgia', 'Georgia'],
  ['Times New Roman', 'Times New Roman'],
  ['Trebuchet MS', 'Trebuchet MS'],
  ['Verdana', 'Verdana'],
];

const FONT_SIZE_OPTIONS: [string, string][] = [
  ['8px', '8px'],
  ['10px', '10px'],
  ['13px', '13px'],
  ['15px', '15px'],
  ['16px', '16px'],
  ['18px', '18px'],
  ['20px', '20px'],
  ['24px', '24px'],
  ['32px', '32px'],
];

interface FontDropDownProps {
  value: string;
  style: string;
  disabled?: boolean;
  editor: LexicalEditor;
}

const FontDropDown: FC<FontDropDownProps> = ({
  value,
  style,
  editor,
  disabled,
}) => {
  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            [style]: option,
          });
        }
      });
    },
    [editor, style]
  );

  const buttonAriaLabel =
    style === 'font-family'
      ? 'Formatting options for font family'
      : 'Formatting options for font size';

  function dropDownActiveClass(active: boolean) {
    if (active) return 'active dropdown-item-active';
    else return '';
  }

  return (
    <DropDown
      disabled={disabled}
      buttonClassName={'toolbar-item ' + style}
      buttonLabel={value}
      buttonIconClassName={
        style === 'font-family' ? 'icon block-type font-family' : ''
      }
      buttonAriaLabel={buttonAriaLabel}
    >
      {(style === 'font-family' ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS).map(
        ([option, text]) => (
          <DropDownItem
            className={`item ${dropDownActiveClass(value === option)} ${
              style === 'font-size' ? 'fontsize-item' : ''
            }`}
            onClick={() => handleClick(option)}
            key={option}
          >
            <span className='text'>{text}</span>
          </DropDownItem>
        )
      )}
    </DropDown>
  );
};

export default FontDropDown;
