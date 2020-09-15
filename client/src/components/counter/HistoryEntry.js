import React from 'react';

const HistoryEntry = ({ change, subtotal }) => {
  return (
    <div>
      <span>Change {change}</span>|<span>Subtotal {subtotal}</span>
    </div>
  );
};

export default HistoryEntry;
