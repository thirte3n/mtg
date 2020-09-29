import React from 'react';

const DiceDisplay = ({ diceRoll }) => {
  return (
    <div className="total-count-dice-container">
      <p className={`total-count total-count-dice ${!diceRoll ? 'blank' : ''}`}>
        {diceRoll}
      </p>
    </div>
  );
};

export default DiceDisplay;
