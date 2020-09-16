import React from 'react';
import '../../Counter.css';
import TotalCount from './TotalCount';
import History from './History';
import Buttons from './Buttons';

const Counter = () => {
  return (
    <div className="counter">
      <TotalCount />
      <History />
      <Buttons />
    </div>
  );
};

export default Counter;
