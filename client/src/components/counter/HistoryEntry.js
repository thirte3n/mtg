import React from 'react';

const HistoryEntry = ({ change, subtotal }) => {
  return (
    <>
      <span className="change">{change}</span>
      <span className="subtotal">{subtotal}</span>
    </>
  );
};

export default HistoryEntry;
