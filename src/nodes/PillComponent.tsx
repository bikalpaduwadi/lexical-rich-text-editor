import { FC } from 'react';

import './PillComponent.css';

interface PillComponentProps {
  displayText: string;
}

const PillComponent: FC<PillComponentProps> = ({ displayText }) => {
  return (
    <>
      <span className='pill'># {displayText}</span>
    </>
  );
};

export default PillComponent;
