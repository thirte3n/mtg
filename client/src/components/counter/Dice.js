import React, { useState } from 'react';
import DiceDisplay from './DiceDisplay';
import DiceButtons from './DiceButtons';

const Dice = () => {
  const [diceRoll, setDiceRoll] = useState(null);

  return (
    <div>
      <DiceDisplay diceRoll={diceRoll} />
      <DiceButtons setDiceRoll={setDiceRoll} />
    </div>
  );
};

export default Dice;
