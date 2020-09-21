import React from 'react';
import { useSelector } from 'react-redux';
import '../../Counter.css';
import SingleCounter from './SingleCounter';
import LandCounters from './LandCounters';
import Dice from './Dice';
import ModeSelector from './ModeSelector';

const Counter = () => {
  const mode = useSelector((state) => state.counter.mode);

  const checkIfSingleCounter = () => {
    return mode === 'life' || mode === 'poison' ? true : false;
  };

  return (
    <div className="counter">
      {checkIfSingleCounter() && <SingleCounter />}
      {mode === 'land' && <LandCounters />}
      {mode === 'dice' && <Dice />}
      <ModeSelector />
    </div>
  );
};

export default Counter;
