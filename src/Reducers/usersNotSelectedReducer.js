import { SEND} from '../Actions/userActions';
import { WINNERS_VALIDATED } from '../Actions/winnerActions';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) { 
    case SEND:
      return [...action.payload.users];
    case WINNERS_VALIDATED:
      return state.filter(item => !action.payload.emails.includes(item.email))
    default:
      return state;
  }
};
