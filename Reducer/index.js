// import { combineReducers } from 'redux';
// import {UPDATE_CART} from '../Actions/castAddActions'
// import {
//   LOAD_USER_ITEMS
// } from '../Actions/loadUserItems';

const INITIAL_STATE = {
  counter :  0,
  cartItems: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
      case 'INCREASE_COUNTER' :
        return {
          counter: state.counter + 1
        }
      case 'DECREASE_COUNTER' :
      return {
        counter: state.counter - 1
      }
      case 'ADD_CART' : {
      console.log("PAYLOAD",action.payload)
       return [...state, ...action.payload]
     }
  }
  return state;
};


export default reducer;
