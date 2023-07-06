import { FC } from 'react';

import useEditorState from '../hooks/useEditorState';

interface ViewContentProps {}

const ViewContent: FC<ViewContentProps> = ({}) => {
  const { value } = useEditorState();

  return (
    <div className='content-container'>
      <div className='content-header'>HTML Content !!!</div>
      <div>{value}</div>
    </div>
  );
};

export default ViewContent;
