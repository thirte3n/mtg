import React from 'react';

const DiceModalDisplay = ({ value, setValue }) => {
  const removeLastDigit = () => {
    const newValue = value.slice(0, -1);
    setValue(newValue);
  };

  return (
    <div className="dice-modal-display">
      <p>{value}</p>
      <button onClick={removeLastDigit}>{'<='}</button>
    </div>
  );
};

export default DiceModalDisplay;
