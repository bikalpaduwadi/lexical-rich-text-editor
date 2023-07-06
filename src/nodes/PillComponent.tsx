import { FC } from 'react';

interface PillComponentProps {
  displayText: string;
}

const PillComponent: FC<PillComponentProps> = ({ displayText }) => {
  return (
    <span
      className='test-th'
      style={{ color: 'red', backgroundColor: '#b6abab', padding: '8px' }}
    >
      PillComponent - {displayText}
    </span>
  );
};

export default PillComponent;
