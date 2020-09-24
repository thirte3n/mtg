import React from 'react';
import DiceButton from './DiceButton';

const DiceButtons = ({ setDiceRoll }) => {
  return (
    <div>
      <DiceButton setDiceRoll={setDiceRoll} value={2} />
      <DiceButton setDiceRoll={setDiceRoll} value={4} />
      <DiceButton setDiceRoll={setDiceRoll} value={6} />
      <DiceButton setDiceRoll={setDiceRoll} value={8} />
      <DiceButton setDiceRoll={setDiceRoll} value={10} />
      <DiceButton setDiceRoll={setDiceRoll} value={12} />
      <DiceButton setDiceRoll={setDiceRoll} value={20} />
      <DiceButton setDiceRoll={setDiceRoll} value={100} />
      <DiceButton setDiceRoll={setDiceRoll} value={'x'} />
    </div>
  );
};

export default DiceButtons;
