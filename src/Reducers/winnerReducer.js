import { WINNERS_VALIDATED, MAIL_WINNERS } from '../Actions/winnerActions';


const initialState = [];

/** a part l'indentation tout va bien  */
export const winnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAIL_WINNERS:
      return [
        ...state,
        {
          date: new Date(),
          winners: action.payload.users,
          alreadyMailed: false,
        },
      ];
    case WINNERS_VALIDATED:
      return [
        ...state.slice(0, -1),
        {
          ...state[state.length - 1],        },
      ];
    // case ADD_PARTICIPATION:
    //   return [...state,action.payload]
    default:
      return state;
  }
};
