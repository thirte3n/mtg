import React from 'react';
import { useSelector } from 'react-redux';

const TotalCount = () => {
  const lifeCounter = useSelector(state => state.counter.lifeCounter);

  return <h2 className="total-count">{lifeCounter}</h2>;
};

export default TotalCount;
