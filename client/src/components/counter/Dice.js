import React, { useState } from 'react';
import DiceDisplay from './DiceDisplay';
import DiceButtons from './DiceButtons';
import DiceModal from './DiceModal';
import '../../Dice.css';

const Dice = () => {
  const [diceRoll, setDiceRoll] = useState(null);
  const [modal, setModal] = useState(false);

  return (
    <div className={`dice-roll`}>
      <DiceDisplay diceRoll={diceRoll} />
      <DiceButtons
        setDiceRoll={setDiceRoll}
        modal={modal}
        setModal={setModal}
      />
      <DiceModal setDiceRoll={setDiceRoll} modal={modal} setModal={setModal} />
    </div>
  );
};

export default Dice;
