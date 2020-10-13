import React from 'react';

const DiceModalInput = ({ value, setValue, prevValue }) => {
  const handleClick = (e) => {
    const inputData = e.target.dataset.btnValue;
    const isCustomValue = inputData.length === 1 ? false : true;
    const newInput = !isCustomValue ? inputData : e.target.textContent;

    // Prevents pressing button if prevValue is null
    if (newInput === '') {
      return;
    }

    // Change input value to prevValue instead of appending prevValue to the input value every time the prevValue button is pressed
    // Prevents conflict with prevValue button being same value as regular buttons by checking if button pressed is custom value (i.e. prevValue button)
    if (newInput === prevValue && isCustomValue) {
      return setValue(prevValue);
    }

    // Prevents total value exceeding 99,999
    if (value.length === 5) {
      return;
    }

    // Prevents leading zeroes
    if (value.length === 1 && Number(value) === 0) {
      if (Number(newInput) === 0) {
        return;
      }

      return setValue(newInput);
    }

    const newValue = value + newInput;
    setValue(newValue);
  };

  return (
    <div className="dice-modal-input">
      <button
        data-btn-value="7"
        onClick={handleClick}
        className="btn-dice-modal"
      >
        7
      </button>
      <button
        data-btn-value="8"
        onClick={handleClick}
        className="btn-dice-modal"
      >
        8
      </button>
      <button
        data-btn-value="9"
        onClick={handleClick}
        className="btn-dice-modal"
      >
        9
      </button>
      <button
        data-btn-value="4"
        onClick={handleClick}
        className="btn-dice-modal"
      >
        4
      </button>
      <button
        data-btn-value="5"
        onClick={handleClick}
        className="btn-dice-modal"
      >
        5
      </button>
      <button
        data-btn-value="6"
        onClick={handleClick}
        className="btn-dice-modal"
      >
        6
      </button>
      <button
        data-btn-value="1"
        onClick={handleClick}
        className="btn-dice-modal"
      >
        1
      </button>
      <button
        data-btn-value="2"
        onClick={handleClick}
        className="btn-dice-modal"
      >
        2
      </button>
      <button
        data-btn-value="3"
        onClick={handleClick}
        className="btn-dice-modal"
      >
        3
      </button>
      <button
        data-btn-value="0"
        onClick={handleClick}
        className="btn-dice-modal"
      >
        0
      </button>
      <button
        data-btn-value="prev-value"
        onClick={handleClick}
        className="btn-dice-modal btn-prev-value"
      >
        {prevValue}
      </button>
    </div>
  );
};

export default DiceModalInput;
