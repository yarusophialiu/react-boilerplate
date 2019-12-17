import axios from 'axios';

export const getUsers = () =>
  axios.get('https://rem-rest-api.herokuapp.com/api/users', {
    params: {
      limit: 1000,
    },
  });

export const deleteUser = userId =>
  axios.delete(`https://rem-rest-api.herokuapp.com/api/users/${userId}`);
