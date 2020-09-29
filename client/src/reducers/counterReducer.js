import {
  MANIPULATE_SINGLE_COUNTER,
  MANIPULATE_LAND_COUNTER,
  UPDATE_HISTORY,
  SET_MODE,
} from '../actions/types';

const initialState = {
  mode: 'dice',
  lifeCounter: 20,
  poisonCounter: 0,
  lifeHistory: [],
  poisonHistory: [],
  landCounter: {
    plains: {
      landType: 'plains',
      count: 0,
    },
    island: {
      landType: 'island',
      count: 0,
    },
    swamp: {
      landType: 'swamp',
      count: 0,
    },
    mountain: {
      landType: 'mountain',
      count: 0,
    },
    forest: {
      landType: 'forest',
      count: 0,
    },
  },
  theme: 'plains',
  loading: true,
};

const counterReducer = (state = initialState, action) => {
  const history = `${action.mode}History`;
  const counter = `${action.mode}Counter`;
  const landType = action.landType;

  switch (action.type) {
    case MANIPULATE_SINGLE_COUNTER:
      return {
        ...state,
        [counter]: state[counter] + action.payload,
      };

    case MANIPULATE_LAND_COUNTER:
      return {
        ...state,
        [counter]: {
          ...state[counter],
          [landType]: {
            ...state[counter][landType],
            count: state[counter][landType].count + action.payload,
          },
        },
      };

    case UPDATE_HISTORY:
      return {
        ...state,
        [history]: [
          { change: action.payload, subtotal: state[counter] },
          ...state[history],
        ],
      };

    case SET_MODE:
      return {
        ...state,
        mode: action.payload,
      };

    default:
      return state;
  }
};

export default counterReducer;
