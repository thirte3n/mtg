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
    <div>
      <button onClick={() => handleButton(1)}>+1</button>
      <button onClick={() => handleButton(5)}>+5</button>
      <button onClick={() => handleButton(-1)}>-1</button>
      <button onClick={() => handleButton(-5)}>-5</button>
    </div>
  );
};

export default Buttons;
