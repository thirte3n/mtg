import React from 'react';
import { useSelector } from 'react-redux';
import '../../Counter.css';
import TotalCount from './TotalCount';
import History from './History';
import Buttons from './Buttons';
import ModeSelector from './ModeSelector';

const Counter = () => {
  const mode = useSelector(state => state.counter.mode);

  const lifeCounter = (
    <>
      <TotalCount mode={mode} />
      <History mode={mode} />
      <Buttons />
    </>
  );

  const checkIfSingleCounter = () => {
    return mode === 'life' || mode === 'poison' ? true : false;
  };

  return (
    <div className="counter">
      {checkIfSingleCounter() && lifeCounter}
      <ModeSelector />
    </div>
  );
};

export default Counter;
