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
    <div className="buttons-land">
      <button className="btn-land" onClick={() => handleButton(1)}>
        +
      </button>
      <button className="btn-land" onClick={() => handleButton(-1)}>
        -
      </button>
    </div>
  );
};

export default LandButtons;
