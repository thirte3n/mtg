import React from 'react';
import { manipulateLandCounter } from '../../actions/counterActions';
import { useDispatch, useSelector } from 'react-redux';

const LandButtons = ({ landType }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.counter.mode);

  const handleButton = (amount) => {
    dispatch(manipulateLandCounter(amount, landType, mode));
  };

  return (
    <>
      <button onClick={() => handleButton(1)}>+</button>
      <button onClick={() => handleButton(-1)}>-</button>
    </>
  );
};

export default LandButtons;
