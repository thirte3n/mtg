import React from 'react';
import { generateRandomNum } from '../../utils/generateRandomNum';

const DiceButton = ({ setDiceRoll, setModal, value }) => {
  const handleButton = () => {
    // Call modal if custom number generator is clicked
    if (typeof value !== 'number') {
      setModal(true);
      return;
    }

    setDiceRoll(generateRandomNum(value));
  };

  return (
    <button className="btn-dice btn-roboto" onClick={handleButton}>
      {value === 2 ? 'coin' : value}
    </button>
  );
};

export default DiceButton;
