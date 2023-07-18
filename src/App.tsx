import Editor from './components/editor';

import './App.css';
import './styles/index.css';
import ViewContent from './components/ViewContent';
import CustomModal from './components/CustomModal';

const ModalWrapper = ({ handleInsertData }: { handleInsertData: (value: any) => void }) => {
  const modalContent = 'This is a content from wrapper';

  return <CustomModal modalContent={modalContent} handleInsertData={handleInsertData} />
}

function App() {
  return (
    <div>
      <Editor ModalWrapper={ModalWrapper} />
      <ViewContent />
    </div>
  );
}

export default App;
