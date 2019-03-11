import { WINNERS_VALIDATED, MAIL_WINNERS, ADD_PARTICIPATION } from '../Actions/winnerActions';


const initialState = [];

export default (state = initialState, action) => {
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
    case ADD_PARTICIPATION:
      return [...state,action.payload]
    default:
      return state;
    }
  };

 // case RESET_WINNERS:
      //si la selection est inférieure à 3, je parcours le tableau