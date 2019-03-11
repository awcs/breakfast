import userReducer from './userReducer';
import usersNotSelectedReducer from './usersNotSelectedReducer';
import winnerReducer from './winnerReducer';
import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';


const rootReducer = combineReducers({
  users: userReducer,
  toastr: toastrReducer,
  winnersByWeek: winnerReducer,
  usersNotSelected: usersNotSelectedReducer,
});


export default rootReducer;
 