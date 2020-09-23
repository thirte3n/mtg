import React from 'react';

const LandCounterDisplay = ({ landType, count }) => {
  return (
    <>
      <p className="total-count total-count-land-type">
        {landType.toUpperCase()}
      </p>
      <p className="total-count total-count-land">{count}</p>
    </>
  );
};

export default LandCounterDisplay;
