import React from 'react';
import { useSelector } from 'react-redux';
import LandCounterDisplay from './LandCounterDisplay';
import LandButtons from './LandCounterButtons';

const LandCounter = ({ landType }) => {
  const count = useSelector(
    (state) => state.counter.landCounter[landType].count
  );

  return (
    <div className={`land-counter ${landType}`}>
      <LandCounterDisplay landType={landType} count={count} />
      <LandButtons landType={landType} />
    </div>
  );
};

export default LandCounter;
