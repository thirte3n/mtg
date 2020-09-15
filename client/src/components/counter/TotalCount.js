import React from 'react';
import { useSelector } from 'react-redux';

const TotalCount = () => {
  const lifeCounter = useSelector(state => state.counter.lifeCounter);

  return (
    <div>
      <h2>{lifeCounter}</h2>
    </div>
  );
};

export default TotalCount;
