import React, { useState } from 'react';
import DiceModalInput from './DiceModalInput';
import DiceModalDisplay from './DiceModalDisplay';
import DiceModalSubmitButtons from './DiceModalSubmitButtons';
import '../../DiceModal.css';

const DiceModal = ({ setDiceRoll, modal, setModal }) => {
  const [value, setValue] = useState('');
  const [prevValue, setPrevValue] = useState('');

  const closeModal = () => {
    setValue('');
    setModal(false);
  };

  const handleClick = (e) => {
    // Closes modal if clicked outside of the modal
    if (e.target.className === 'modal-overlay') {
      closeModal();
    }
  };

  return (
    <div
      className={modal ? 'modal-overlay' : 'modal-hide'}
      onClick={handleClick}
    >
      <div
        className={`dice-modal-container ${
          modal ? 'modal-show' : 'modal-hide'
        }`}
      >
        <DiceModalDisplay value={value} setValue={setValue} />
        <DiceModalInput
          value={value}
          setValue={setValue}
          prevValue={prevValue}
        />
        <DiceModalSubmitButtons
          setDiceRoll={setDiceRoll}
          value={value}
          setPrevValue={setPrevValue}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default DiceModal;
