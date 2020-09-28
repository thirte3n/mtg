import React, { useState } from 'react';
import DiceDisplay from './DiceDisplay';
import DiceButtons from './DiceButtons';
import '../../Dice.css';

const Dice = () => {
  const [diceRoll, setDiceRoll] = useState(null);

  return (
    <div className="dice-roll">
      <DiceDisplay diceRoll={diceRoll} />
      <DiceButtons setDiceRoll={setDiceRoll} />
    </div>
  );
};

export default Dice;
