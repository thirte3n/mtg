import React from 'react';
import { setMode } from '../../actions/counterActions';
import { useDispatch } from 'react-redux';

const ModeSelector = () => {
  const dispatch = useDispatch();

  const handleButton = mode => {
    dispatch(setMode(mode));
  };

  return (
    <div className="buttons-mode">
      <button className="btn-mode-change" onClick={() => handleButton('life')}>
        1
      </button>
      <button
        className="btn-mode-change"
        onClick={() => handleButton('poison')}
      >
        2
      </button>
      <button className="btn-mode-change" onClick={() => handleButton('land')}>
        3
      </button>
      <button className="btn-mode-change" onClick={() => handleButton('dice')}>
        4
      </button>
    </div>
  );
};

export default ModeSelector;
