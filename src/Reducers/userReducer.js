import { SEND, DELETE_USER, ADD_USER } from '../Actions/userActions';

const initialState = [];

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case DELETE_USER:
      return state.filter(users => users.id !== action.payload.id);
    case SEND:
      return [ ...action.payload.users];
    default:
      return state;
  }
};
