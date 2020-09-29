import React, { useState } from 'react';
import DiceModalButtons from './DiceModalButtons';
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
    //TODO: change counterReducer.js initialState.mode = life and Dice.js modal useState(false)
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
        <DiceModalButtons
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
