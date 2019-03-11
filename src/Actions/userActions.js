import axios from 'axios';

const apiUrl = 'http://localhost:6998/users';

export const SEND = 'app: dispatchUsersAction';
export const ADD_USER = 'users: addUsersAction';
export const DELETE_USER = 'users: deleteUserAction'


export const dispatchUsersAction = users => {
  console.log(users);
  return {
    type: SEND,
    payload: {
      users: users,
    },
  };
};

export const addUsersAction = ({ nom_prenom, email }) => {
  return dispatch => {
    return axios
      .post(apiUrl, { nom_prenom, email })
      .then(response => {
        dispatch(addUser(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const addUser = data => {
  return {
    type: ADD_USER,
    payload: {
      id: data.id,
      nom_prenom: data.nom_prenom,
      email: data.email,
    },
  };
};

export const deleteUserAction = userId => {
  return dispatch => {
    return axios
      .delete(`${apiUrl}/${userId}`)
      .then(response => {
        dispatch(deleteUser(userId));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const deleteUser = userId => {
  return {
    type: DELETE_USER,
    payload: {
      id: userId,
    },
  };
};
