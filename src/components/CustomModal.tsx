import { useState } from 'react';

function CustomModal({ handleInsertData, modalContent }: { handleInsertData: (value: any) => void, modalContent?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      {isOpen && (
        <dialog open style={{ zIndex: 555 }}>
          <div>
            <h2>Modal Content</h2>
            {modalContent}
            <p>This is the content of the modal.</p>
            <button onClick={() => handleInsertData('Inserted value from modal')}>Insert</button>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default CustomModal
