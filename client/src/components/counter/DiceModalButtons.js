import React from 'react';

const DiceModalButtons = ({ value, setValue, prevValue }) => {
  const handleClick = (e) => {
    const newInput = e.target.textContent;
    const newValue = value + newInput;
    setValue(newValue);
  };

  return (
    <div className="dice-modal-buttons">
      <button onClick={handleClick}>7</button>
      <button onClick={handleClick}>8</button>
      <button onClick={handleClick}>9</button>
      <button onClick={handleClick}>4</button>
      <button onClick={handleClick}>5</button>
      <button onClick={handleClick}>6</button>
      <button onClick={handleClick}>1</button>
      <button onClick={handleClick}>2</button>
      <button onClick={handleClick}>3</button>
      <button onClick={handleClick}>0</button>
      <button onClick={handleClick}>{prevValue}</button>
    </div>
  );
};

export default DiceModalButtons;
