import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { getUsersRequest } from './actions';
import { makeSelectUsers } from './selectors';
import UserList from './UserList';
import reducer from './reducer';
import saga from './saga';

const key = 'users';

export function Users() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  // useEffect(() => {
  //   getUsersRequest();
  // }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('https://rem-rest-api.herokuapp.com/api/users', {
        params: {
          limit: 1000,
        },
      })
      .then(({ data }) => {
        setUsers(data.data);
      });
  }, []);
  return (
    <div>
      <Helmet>
        <title>User Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      
      <UserList users={users} />
    </div>
  );
}

Users.propTypes = {
  // getUsers: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
});

const withConnect = connect(
  mapStateToProps,
  {
    getUsersRequest,
  },
);

export default compose(
  withConnect,
  memo,
)(Users);
