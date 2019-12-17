import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';

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
              {/* <div>
                <Button
                  outline
                  color="danger"
                  onClick={() => onDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </div> */}
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
