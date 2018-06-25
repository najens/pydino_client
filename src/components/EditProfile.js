import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleEditUser } from '../actions/users'
import FetchError from './FetchError'
import FetchSuccess from './FetchSuccess'
import { Redirect } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import Nav from './Nav'

class Signup extends Component {
  state = {
    user: {},
    name: '',
    username: '',
    email: '',
    picture: '',
    nameChanged: false,
    usernameChanged: false,
    emailChanged: false,
    pictureChanged: false,
  }

  // Use new static method to derive state from props
  static getDerivedStateFromProps(nextProps, prevState) {
		// If the props have changed, set new state
  	if(nextProps.user !== prevState.user) {
      const user = nextProps.user
      if (!user) {
        return null
      }
      console.log(user)
    	return {
        user: user,
				name: user.name,
        username: user.username,
        email: user.email,
        picture: user.picture,
     	}
    }
   	// Otherwise do not update state
    return null;
  }

  handleNameChange = (e) => {
    const name = e.target.value
    const { nameChanged } = this.state

    if (!nameChanged) {
        this.setState(() => ({
            nameChanged: !nameChanged
        }))
    }

    this.setState(() => ({
      name,
    }))
  }
  handleUsernameChange = (e) => {
    const username = e.target.value
    const { usernameChanged } = this.state

    if (!usernameChanged) {
        this.setState(() => ({
            usernameChanged: !usernameChanged
        }))
    }

    this.setState(() => ({
      username,
    }))
  }
  handleEmailChange = (e) => {
    const email = e.target.value
    const { emailChanged } = this.state

    if (!emailChanged) {
        this.setState(() => ({
            emailChanged: !emailChanged
        }))
    }

    this.setState(() => ({
      email,
    }))
  }
  handlePictureChange = (e) => {
    const picture = e.target.value
    const { passwordChanged } = this.state

    if (!passwordChanged) {
        this.setState(() => ({
            passwordChanged: !passwordChanged
        }))
    }

    this.setState(() => ({
      picture,
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { name, username, email, picture, nameChanged, usernameChanged, emailChanged, pictureChanged } = this.state
    const { dispatch, authedUser } = this.props
    const user = {}
    user.public_id = authedUser.id
    if (nameChanged) {
        user.name = name
    }
    if (usernameChanged) {
        user.username = username
    }

    if (emailChanged) {
        user.email = email
    }

    if (pictureChanged) {
        user.picture = picture
    }

    if (!user.name && !user.username && !user.email && !user.picture) {
        return
    }

    dispatch(handleEditUser(user))
        .then(() => {
            const { errorMessage } = this.props
            if (!errorMessage) {
                this.setState(() => ({
                    nameChanged: false,
                    usernameChanged: false,
                    emailChanged: false,
                    pictureChanged: false,
                }))
            }
        })
  }

  render () {
    const { name, email, username, nameChanged, emailChanged, usernameChanged, pictureChanged } = this.state
    const { successMessage, errorMessage, authedUser, isFetching } = this.props

    if (!authedUser.id) {
        return <Redirect to='/login' />
    }

    return (
      <div>
        <Nav path='/' />
        <div className='container pg-margin'>
          <h2 className='text-center pt-5 pb-3'>Edit Profile</h2>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Name'
                  autoComplete='name'
                  value={name}
                  onChange={this.handleNameChange}
                />
            </div>
            <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Username'
                  autoComplete='username'
                  value={username}
                  onChange={this.handleUsernameChange}
                />
            </div>
            <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Email'
                  autoComplete='email'
                  value={email}
                  onChange={this.handleEmailChange}
                />
            </div>
            <div className='loading-btn-container'>
                <button
                  type="submit"
                  className='w-100 btn btn-primary btn-fixed'
                  disabled={
                    (!nameChanged && !emailChanged && !usernameChanged &&
                    !pictureChanged) || name === '' || email === '' ||
                    username === ''
                  }>
                    Submit
                </button>
                {isFetching && <LoadingSpinner />}
            </div>
            <div className='d-flex flex-column align-items-center'>
                {successMessage && <FetchSuccess message={successMessage} />}
                {errorMessage && <FetchError message={errorMessage} />}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users, errorMessage, authedUser, isFetching, successMessage }) {
  const user = users[authedUser.id]

  return {
    errorMessage,
    authedUser,
    isFetching,
    successMessage,
    user,
  }
}

export default connect(mapStateToProps)(Signup)
