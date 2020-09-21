import React from 'react';

const LandCounterDisplay = ({ landType, count }) => {
  return (
    <>
      <p>{landType.toUpperCase()}</p>
      <p>{count}</p>
    </>
  );
};

export default LandCounterDisplay;
