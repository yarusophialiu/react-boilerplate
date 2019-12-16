import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

function UserList(props) {
  return (
    <ListGroup>
      {props.users.map(user => {
        return (
          <ListGroupItem key={user.id}>
            <section style={{ display: 'flex' }}>
              <div style={{ flexGrow: 1 }}>
                {user.firstName} {user.lastName}
              </div>
              <div>
                <Button
                  outline
                  color="danger"
                  onClick={() => onDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </div>
            </section>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;
