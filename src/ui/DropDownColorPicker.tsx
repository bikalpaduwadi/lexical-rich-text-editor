import { FC } from 'react';
import DropDown from './DropDown';
import ColorPicker from './ColorPicker';

interface DropDownColorPickerProps {
  color: string;
  title?: string;
  disabled?: boolean;
  buttonLabel?: string;
  buttonClassName: string;
  buttonAriaLabel?: string;
  buttonIconClassName?: string;
  stopCloseOnClickSelf?: boolean;
  onChange?: (color: string) => void;
}

const DropDownColorPicker: FC<DropDownColorPickerProps> = ({
  color,
  onChange,
  disabled = false,
  stopCloseOnClickSelf = true,
  ...rest
}) => {
  return (
    <DropDown
      {...rest}
      disabled={disabled}
      stopCloseOnClickSelf={stopCloseOnClickSelf}
    >
      <ColorPicker color={color} onChange={onChange} />
    </DropDown>
  );
};

export default DropDownColorPicker;
