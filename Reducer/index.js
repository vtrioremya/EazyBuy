import { combineReducers } from 'redux';

const INITIAL_STATE = {
  counter :  0
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
};


export default combineReducers({
  counter: reducer,
});
