import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'
import { Redirect } from 'react-router-dom'

class UserList extends Component {
  render() {
    const { userIds, authedUser } = this.props

    if (authedUser.id === '') {
        return <Redirect to='/login' />
    }

    return (
      <div>
        <ul>
          {userIds.map((id) => (
            <li className='list-group-item' key={id}>
              <User id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    userIds: Object.keys(users),
    authedUser,
  }
}

export default connect(mapStateToProps)(UserList);
