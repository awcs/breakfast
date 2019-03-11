import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import underscore from 'underscore';

const apiSendUsersUrl = 'http://localhost:6998/send';
const apiUrl = 'http://localhost:6998/users';

const toastrOptions = {
  timeOut: 3000,
  onCloseButtonClick: () => console.log('Close button was clicked'),
  showCloseButton: false,
};

export const ADD_WINNERS_BY_WEEK = 'winners: addWinnersByWeekAction';
export const MAIL_WINNERS = 'winners: mailWinnersAction';
export const WINNERS_VALIDATED = 'WINNERS_VALIDATED action';
// export const ADD_PARTICIPATION = 'addParticipationAction';

const winnersSelected = users => {
  return {
    type: MAIL_WINNERS,
    payload: {
      users,
    },
  };
};

const winnersValidated = (emails) => {
  return {
    type: WINNERS_VALIDATED,
    payload : {
      emails, 
    },
  };
};

//déclaration action qui va incréménter ma base de donnée
// export const addParticipationAction = (data) => {
//   return {
//     type: ADD_PARTICIPATION,
//     payload: {
//       participation: data.participation,
//     },
//   };
// };

// export const addParticipationThunk = () => {
//   return (dispatch, getState) => {
//     console.log(getState())
//     return axios
//       .put(apiUrl, [{userId}])
//       .then(response => {
//         console.log(response);
//         dispatch(addParticipationAction(response.data));
//       })
//       .catch(error => {
//         throw error;
//       });
//   };
// };


export const selectWinnersAction = (sampleCount) => {
  return (dispatch, getState) => {
    const users = getState().usersNotSelected;
    const sampled = underscore.sample(users, sampleCount);
    dispatch(winnersSelected(sampled));
  };
};

export const validateWinnersAction = () => {
  return (dispatch, getState) => {
    
    //getState fonction qui permet d'accéder au state
    const state = getState();
    const winners =
      state.winnersByWeek.length > 0
      
        ? state.winnersByWeek[state.winnersByWeek.length - 1].winners
        : [];
    const emails = winners.map(item => item.email);
    return axios
      .post(apiSendUsersUrl, { emails })
      .then(response => {
        toastr.success(
          'Confirmation',
          'Un mail a bien été envoyé aux 3 participants',
          toastrOptions,
        );
        dispatch(winnersValidated(emails));
      })
      .catch(error => {
        throw error;
      });
  };
}
