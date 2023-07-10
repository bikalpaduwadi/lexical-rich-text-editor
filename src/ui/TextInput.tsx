import { FC, HTMLInputTypeAttribute } from 'react';

import './TextInput.css';

interface TextInputProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange: (val: string) => void;
}

const TextInput: FC<TextInputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
}) => {
  return (
    <div className='Input__wrapper'>
      <label className='Input__label'>{label}</label>
      <input
        type={type}
        className='Input__input'
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default TextInput;
