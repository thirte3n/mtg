import React from 'react';
import DiceButton from './DiceButton';

const DiceButtons = ({ setDiceRoll, modal, setModal }) => {
  const values = [2, 4, 6, 8, 10, 12, 20, 100, 'x'];

  const diceButtons = values.map((value) => (
    <DiceButton
      className="dice-button"
      setDiceRoll={setDiceRoll}
      modal={modal}
      setModal={setModal}
      value={value}
      key={value}
    />
  ));

  return <div className="dice-buttons">{diceButtons}</div>;
};

export default DiceButtons;
