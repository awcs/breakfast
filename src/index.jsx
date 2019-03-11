import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import  {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import ReduxToastr from 'react-redux-toastr';
import thunk from 'redux-thunk';

import { userReducer } from './Reducers/userReducer';
import { winnerReducer } from './Reducers/winnerReducer';
import { usersNotSelectedReducer } from './Reducers/usersNotSelectedReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  users: userReducer,
  toastr: toastrReducer,
  winnersByWeek: winnerReducer,
  usersNotSelected: usersNotSelectedReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);


ReactDOM.render(
  <Provider store={store}>
   <BrowserRouter>
     <App />
   </BrowserRouter>
   <ReduxToastr
      timeOut={2000}
      newestOnTop={false}
      preventDuplicates
      position="bottom-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar/>
</Provider>
  , document.getElementById('root'));

