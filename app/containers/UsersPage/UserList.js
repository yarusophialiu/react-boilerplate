import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import PropTypes from 'prop-types';

function UserList(props) {
  return (
    <ListGroup>
      {props.users.map(user => (
        <ListGroupItem key={user.id}>
          <section style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1 }}>
              {user.firstName} {user.lastName}
            </div>
            <div>
              <Button
                outline
                color="danger"
                onClick={() => props.onDeleteUser(user.id)}
              >
                Delete
              </Button>
            </div>
          </section>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onDeleteUser: PropTypes.func,
};

export default UserList;
