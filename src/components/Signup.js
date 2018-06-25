import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddUser } from '../actions/users'
import { handleLoginOAuth } from '../actions/authedUser'
import FetchError from './FetchError'
import FetchSuccess from './FetchSuccess'
import { Redirect } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import { FaGoogle, FaFacebookSquare } from 'react-icons/lib/fa'
import Nav from './Nav'

class Signup extends Component {
  state = {
    name: '',
    email: '',
    username: '',
    password: '',
  }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.setState(() => ({
        token: response.authResponse
      }))
      this.testAPI()
    } else {
      // The person is not logged into your app or we are unable to tell.

    }
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  // Request path to get user info back
  // https://graph.facebook.com/v2.8/me?
  // url params: acces_token=token & fields=id,name,email,picture
  testAPI() {
    const { token } = this.state
    const { dispatch } = this.props
    window.FB.api('/me?fields=id,name,email,picture', function(response) {
      const oauth = {
        token,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
        provider_user_id: response.id,
      }
      dispatch(handleLoginOAuth(oauth, 'facebook'))
    });
  }

  handleFacebookConnect = () => {
    const self = this
    window.FB.login(function(response) {
      // handle the response
      console.log(response)
      self.statusChangeCallback(response)
    }, {scope: 'public_profile,email'});
  }

  handleGoogleConnect = () => {
    const { dispatch } = this.props
    const GoogleAuth = window.gapi.auth2.getAuthInstance()
    GoogleAuth.signIn().then(function(GoogleUser) {
      const token = GoogleUser.getAuthResponse(true)
      const BasicProfile = GoogleUser.getBasicProfile()
      token.userID = BasicProfile.getId()

      const oauth = {
        token,
        name: BasicProfile.getName(),
        email: BasicProfile.getEmail(),
        picture: BasicProfile.getImageUrl(),
        provider_user_id: BasicProfile.getId(),
      }
      dispatch(handleLoginOAuth(oauth, 'google'))
    })
  }

  handleNameChange = (e) => {
    const name = e.target.value

    this.setState(() => ({
      name,
    }))
  }
  handleEmailChange = (e) => {
    const email = e.target.value

    this.setState(() => ({
      email,
    }))
  }
  handleUsernameChange = (e) => {
    const username = e.target.value

    this.setState(() => ({
      username,
    }))
  }
  handlePasswordChange = (e) => {
    const password = e.target.value

    this.setState(() => ({
      password,
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { name, email, username, password } = this.state
    const { dispatch } = this.props

    dispatch(handleAddUser({
        name,
        email,
        username,
        password,
    })).then(() => {
        const { errorMessage } = this.props
        if (!errorMessage) {
            this.setState(() => ({
              name: '',
              email: '',
              username: '',
              password: '',
            }))
        }
    })
  }

  render () {
    const { name, email, username, password } = this.state
    const { successMessage, errorMessage, authedUser, isFetching } = this.props

    if (authedUser.id) {
        return <Redirect to='/' />
    }

    return (
      <div>
        <Nav path='/' />
        <div className='container pg-margin'>
          <h2 className='text-center pt-5 pb-3'>Sign up</h2>
          <a onClick={this.handleGoogleConnect}>
            <div className="mb-3 w-100 btn btn-google">
              <FaGoogle className='login-icon' />
              Continue with Google
            </div>
          </a>
          <a onClick={this.handleFacebookConnect}>
            <div className='w-100 btn btn-facebook'>
              <FaFacebookSquare className='login-icon'/>
              Continue with Facebook
            </div>
          </a>
          <div className='pt-4 pb-4 text-center'>Or</div>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Name'
                  autoComplete='name'
                  value={name}
                  onChange={this.handleNameChange} />
            </div>
            <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Email'
                  value={email}
                  autoComplete='email'
                  onChange={this.handleEmailChange}
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
                  type='password'
                  className='form-control'
                  placeholder='Password'
                  autoComplete='new-password'
                  value={password}
                  onChange={this.handlePasswordChange}
                />
            </div>
            <div className='loading-btn-container'>
                <button type="submit" className='w-100 btn btn-primary btn-fixed' disabled={name === '' || email === '' || username === '' || password === ''}>
                    Sign up
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

function mapStateToProps ({ errorMessage, authedUser, isFetching, successMessage }) {

  return {
    errorMessage,
    authedUser,
    isFetching,
    successMessage,
  }
}

export default connect(mapStateToProps)(Signup)
