import React, { Component } from 'react'
import { connect } from 'react-redux'

class Profile extends Component {
  render () {
    const { authedUser, user } = this.props

    if (user && authedUser.id !== '') {
        return (
          <div className='d-flex flex-column align-items-center'>
            <img
                src={user.picture}
                className='profile-pic'
                alt='profile'
            />
            <span className='text-primary'>{user.name}</span>
          </div>
        )

    }
    return null
  }
}

function mapStateToProps ({ authedUser, users }) {
    const user = users[authedUser.id]
    return {
        authedUser,
        user: user ? user : null
    }
}

export default connect(mapStateToProps)(Profile)
