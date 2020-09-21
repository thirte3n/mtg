import React from 'react';
import { useSelector } from 'react-redux';
import SingleCounterDisplay from './SingleCounterDisplay';
import History from './History';
import SingleCounterButtons from './SingleCounterButtons';

const SingleCounter = () => {
  const mode = useSelector(state => state.counter.mode);

  return (
    <>
      <SingleCounterDisplay mode={mode} />
      <History mode={mode} />
      <SingleCounterButtons />
    </>
  );
};

export default SingleCounter;
