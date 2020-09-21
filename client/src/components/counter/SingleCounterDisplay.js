import React from 'react';
import { useSelector } from 'react-redux';

const SingleCounterDisplay = ({ mode }) => {
  const count = useSelector(state => state.counter[`${mode}Counter`]);

  return <h2 className="total-count">{count}</h2>;
};

export default SingleCounterDisplay;
