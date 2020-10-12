import React from 'react';

const DiceModalDisplay = ({ value, setValue }) => {
  const removeLastDigit = () => {
    const newValue = value.slice(0, -1);
    setValue(newValue);
  };

  return (
    <div className="dice-modal-display">
      <p className="dice-modal-display-input">{value}</p>
      <button
        className="btn-dice-modal dice-modal-display-btn"
        onClick={removeLastDigit}
      >
        {'<='}
      </button>
    </div>
  );
};

export default DiceModalDisplay;
