import React, { useState, useEffect } from 'react';
import {
  manipulateSingleCounter,
  updateHistory
} from '../../actions/counterActions';
import { useDispatch, useSelector } from 'react-redux';

const SingleCounterButtons = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.counter.mode);

  const [isIdle, setIsIdle] = useState(true);
  const [change, setChange] = useState(0);

  let idleTimer;

  const startTimer = () => {
    idleTimer = setTimeout(() => {
      setIsIdle(true);
    }, 2000);
  };

  const handleButton = (amount) => {
    setIsIdle(false);
    clearTimeout(idleTimer);
    setChange(change + amount);
    dispatch(manipulateSingleCounter(amount, mode));
  };

  useEffect(() => {
    if (isIdle && change) {
      dispatch(updateHistory(change, mode));
      setChange(0);
    } else {
      startTimer();
    }
  });

  return (
    <div className="buttons-single-counter">
      <button
        id="btn-single-counter-subtract-one"
        className="btn-single-counter btn-single-counter-tall btn-single-counter-subtract"
        onClick={() => handleButton(-1)}
      >
        -1
      </button>
      <button
        id="btn-single-counter-add-one"
        className="btn-single-counter btn-single-counter-tall btn-single-counter-add"
        onClick={() => handleButton(1)}
      >
        +1
      </button>
      <button
        id="btn-single-counter-subtract-five"
        className="btn-single-counter btn-single-counter-short btn-single-counter-subtract"
        onClick={() => handleButton(-5)}
      >
        -5
      </button>
      <button
        id="btn-single-counter-add-five"
        className="btn-single-counter btn-single-counter-short btn-single-counter-add"
        onClick={() => handleButton(5)}
      >
        +5
      </button>
    </div>
  );
};

export default SingleCounterButtons;
