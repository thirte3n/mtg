import React from 'react';
import { useSelector } from 'react-redux';
import '../../LandCounters.css';
import LandCounter from './LandCounter';

const LandCounters = () => {
  const landCounter = useSelector((state) => state.counter.landCounter);

  return (
    <div className="land-counters">
      {Object.keys(landCounter).map((landType, index) => (
        <LandCounter key={index} landType={landType} />
      ))}
    </div>
  );
};

export default LandCounters;
