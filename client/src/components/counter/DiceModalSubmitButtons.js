import React from 'react';
import { generateRandomNum } from '../../utils/generateRandomNum';

const DiceModalSubmitButtons = ({
  setDiceRoll,
  value,
  setPrevValue,
  closeModal,
}) => {
  const handleSubmit = () => {
    if (!value) {
      return;
    }

    // Prevents submit if value is zero
    if (Number(value) === 0) {
      return;
    }

    setDiceRoll(generateRandomNum(value));
    setPrevValue(value);
    closeModal();
  };

  return (
    <div className="dice-modal-submit-buttons">
      <button
        className="btn-dice-modal btn-dice-modal-end btn-dice-modal-cancel"
        onClick={closeModal}
      >
        Cancel
      </button>
      <button
        className="btn-dice-modal btn-dice-modal-end btn-dice-modal-submit"
        onClick={handleSubmit}
      >
        OK
      </button>
    </div>
  );
};

export default DiceModalSubmitButtons;
