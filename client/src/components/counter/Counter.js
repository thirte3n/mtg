import React from 'react';
import TotalCount from './TotalCount';
import History from './History';
import Buttons from './Buttons';

const Counter = () => {
  return (
    <div>
      <TotalCount />
      <History />
      <Buttons />
    </div>
  );
};

export default Counter;
