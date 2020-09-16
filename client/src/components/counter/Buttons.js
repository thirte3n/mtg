import React, { useState, useEffect } from 'react';
import { manipulateLife, updateHistory } from '../../actions/counterActions';
import { useDispatch } from 'react-redux';

const Buttons = () => {
  const dispatch = useDispatch();

  const [isIdle, setIsIdle] = useState(true);
  const [change, setChange] = useState(0);

  let idleTimer;

  const startTimer = () => {
    idleTimer = setTimeout(() => {
      setIsIdle(true);
    }, 2000);
  };

  const handleButton = num => {
    console.log(num);
    setIsIdle(false);
    clearTimeout(idleTimer);
    setChange(change + num);
    dispatch(manipulateLife(num));
  };

  useEffect(() => {
    if (isIdle && change) {
      dispatch(updateHistory(change));
      setChange(0);
    } else {
      startTimer();
    }
  });

  return (
    <div className="buttons-life">
      <button
        id="btn-life-subtract-one"
        className="btn-life btn-life-tall btn-life-subtract"
        onClick={() => handleButton(-1)}
      >
        -1
      </button>
      <button
        id="btn-life-add-one"
        className="btn-life btn-life-tall btn-life-add"
        onClick={() => handleButton(1)}
      >
        +1
      </button>
      <button
        id="btn-life-subtract-five"
        className="btn-life btn-life-short btn-life-subtract"
        onClick={() => handleButton(-5)}
      >
        -5
      </button>
      <button
        id="btn-life-add-five"
        className="btn-life btn-life-short btn-life-add"
        onClick={() => handleButton(5)}
      >
        +5
      </button>
    </div>
  );
};

export default Buttons;
