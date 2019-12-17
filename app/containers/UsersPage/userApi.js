import axios from 'axios';

export const getUsers = () => {
  console.log('hi');
  axios.get('https://rem-rest-api.herokuapp.com/api/users', {
    params: {
      limit: 1000,
    },
  });
};

export const deleteUser = userId => axios.delete(`/users/${userId}`);
