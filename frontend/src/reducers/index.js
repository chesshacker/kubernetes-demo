import { combineReducers } from 'redux';
import { PING, PONG } from '../actions';

const pods = (state = [], action) => {
  switch (action.type) {
    case PONG:
      return action.pods;
    default:
      return state;
  }
};

const counters = (state = {sent: 0, received: 0}, action) => {
  switch (action.type) {
    case PING:
      return {...state, sent: state.sent + 1};
    case PONG:
      return {...state, received: state.received + 1};
    default:
      return state;
  }
};

const latest = (state = '', action) => {
  switch (action.type) {
    case PONG:
      return action.hostname;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  pods,
  counters,
  latest,
});

export default rootReducer;
