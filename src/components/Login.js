import React, { Component } from "react"
import { connect } from 'react-redux'
import { handleLogin, handleLoginOAuth } from '../actions/authedUser'
import { Redirect, NavLink } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import FetchSuccess from './FetchSuccess'
import FetchError from './FetchError'
import { FaGoogle, FaFacebookSquare } from 'react-icons/lib/fa'
import { clearSuccessMessage } from '../actions/successMessage'
import { clearErrorMessage } from '../actions/errorMessage'
import Nav from './Nav'

class Login extends Component {
    state = {
      username: '',
      password: '',
      token: '',
    }
    // This is called with the results from from FB.getLoginStatus().
    statusChangeCallback(response) {
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        const token = response.authResponse
        // Logged into your app and Facebook.
        this.setState(() => ({
          token,
        }))
        this.testAPI()
        // const provider = 'facebook'
        // return dispatch(handleLoginOAuth(token, provider))
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
        console.log('Login response: ', response)
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

      const { username, password } = this.state
      const { dispatch } = this.props

      dispatch(handleLogin({
          username,
          password,
      }))
    }
    handleClick = () => {
        const { dispatch } = this.props
        dispatch(clearSuccessMessage())
        dispatch(clearErrorMessage())
    }

    render () {
        const { username, password } = this.state
        const { authedUser, isFetching, errorMessage, successMessage } = this.props

        if (authedUser.id) {
            return <Redirect to='/' />
        }

        return (
          <div>
            <Nav path='/' />
            <div className="container pg-margin">
                <h2 className='text-center pt-5 pb-3'>Log In</h2>
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
                        placeholder='Username or Email'
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
                        autoComplete='current-password'
                        value={password}
                        onChange={this.handlePasswordChange}
                      />
                  </div>
                  <div className='loading-btn-container'>
                      <button
                        className='w-100 btn btn-primary btn-fixed'
                        type="submit"
                        disabled={ username === '' || password === ''}
                      >
                          Log in
                      </button>
                      {isFetching && <LoadingSpinner />}
                  </div>
                  <div className='d-flex flex-column align-items-center'>
                      {successMessage && <FetchSuccess message={successMessage} />}
                      {errorMessage && <FetchError message={errorMessage} />}
                      <NavLink
                        className="primary text-center mt-2 mb-2"
                        to='/password/forgot' exact
                        onClick={this.handleClick}
                        activeClassName='active'>Forgot password?</NavLink>
                  </div>
                </form>
            </div>
          </div>
        )
    }
}

function mapStateToProps ({ authedUser, isFetching, errorMessage, successMessage }, props) {
  console.log(props)
  return {
    authedUser,
    isFetching,
    errorMessage,
    successMessage,
  }
}

export default connect(mapStateToProps)(Login);
