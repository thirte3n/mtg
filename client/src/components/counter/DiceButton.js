import React from 'react';

const DiceButton = ({ setDiceRoll, value }) => {
  const generateRandomNum = (maxNum) => {
    const randomNum = Math.floor(Math.random() * maxNum) + 1;

    // Change random number generator to random coin toss
    if (value === 2) {
      if (randomNum === 1) {
        return 'heads';
      } else {
        return 'tails';
      }
    }

    return randomNum;
  };

  const handleButton = () => {
    // Call modal if custom number generator is clicked
    if (typeof value !== 'number') {
      // Call modal
      return;
    }

    setDiceRoll(generateRandomNum(value));
  };

  return (
    <div>
      <button className="btn-dice" onClick={handleButton}>
        {value === 2 ? 'coin' : value}
      </button>
    </div>
  );
};

export default DiceButton;
