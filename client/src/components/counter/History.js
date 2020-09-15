import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HistoryEntry from './HistoryEntry';

const History = () => {
  const history = useSelector(state => state.counter.history);
  const historyLength = 3;

  return (
    <div>
      {history.slice(0, historyLength).map(({ change, subtotal }, index) => (
        <HistoryEntry key={index} change={change} subtotal={subtotal} />
      ))}
    </div>
  );
};

export default History;
