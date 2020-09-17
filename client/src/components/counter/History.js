import React from 'react';
import { useSelector } from 'react-redux';
import HistoryEntry from './HistoryEntry';

const History = ({ mode }) => {
  const history = useSelector(state => state.counter[`${mode}History`]);
  const historyLength = 3;

  return (
    <div className="history">
      {history.slice(0, historyLength).map(({ change, subtotal }, index) => (
        <HistoryEntry key={index} change={change} subtotal={subtotal} />
      ))}
    </div>
  );
};

export default History;
