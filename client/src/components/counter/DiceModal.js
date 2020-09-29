import React, { useState } from 'react';
import { generateRandomNum } from '../../utils/generateRandomNum';

const DiceModal = ({ setDiceRoll, modal, setModal }) => {
  const [value, setValue] = useState('');

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

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDiceRoll(generateRandomNum(value));
    closeModal();
  };

  return (
    <div
      className={modal ? 'modal-overlay' : 'modal-hide'}
      onClick={handleClick}
    >
      <form
        className={`dice-modal-container ${
          modal ? 'modal-show' : 'modal-hide'
        }`}
        onSubmit={handleSubmit}
      >
        <input
          id="max-num"
          name="max-num"
          type="number"
          value={value}
          onChange={handleChange}
          autoFocus
        />
      </form>
    </div>
  );
};

export default DiceModal;
