import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://rem-rest-api.herokuapp.com/api';

export const getUsers = () =>
  axios.get('/users', {
    params: {
      limit: 1000,
    },
  });

export const deleteUser = userId => axios.delete(`/users/${userId}`);
