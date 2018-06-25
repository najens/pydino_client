import { loginUser, loginToken, loginOAuth, logoutUser, forgotPassword,
  confirmEmail
} from '../utils/apis/login'
import { refreshTokenWrapper } from './csrfAccessToken'
import { showLoading, hideLoading } from 'react-redux-loading'
import { handleAddBracket } from './brackets'

// ACTION TYPES
export const FETCH_LOGIN_REQUEST = 'FETCH_LOGIN_REQUEST'
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS'
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE'
export const FETCH_TOKEN_LOGIN_REQUEST = 'FETCH_TOKEN_LOGIN_REQUEST'
export const FETCH_TOKEN_LOGIN_SUCCESS = 'FETCH_TOKEN_LOGIN_SUCCESS'
export const FETCH_TOKEN_LOGIN_FAILURE = 'FETCH_TOKEN_LOGIN_FAILURE'
export const FETCH_LOGOUT_REQUEST = 'FETCH_LOGOUT_REQUEST'
export const FETCH_LOGOUT_SUCCESS = 'FETCH_LOGOUT_SUCCESS'
export const FETCH_LOGOUT_FAILURE = 'FETCH_LOGOUT_FAILURE'
export const FETCH_FORGOT_PASSWORD_REQUEST = 'FETCH_FORGOT_PASSWORD_REQUEST'
export const FETCH_FORGOT_PASSWORD_SUCCESS = 'FETCH_FORGOT_PASSWORD_SUCCESS'
export const FETCH_FORGOT_PASSWORD_FAILURE = 'FETCH_FORGOT_PASSWORD_FAILURE'
export const FETCH_CONFIRM_EMAIL_REQUEST = 'FETCH_CONFIRM_EMAIL_REQUEST'
export const FETCH_CONFIRM_EMAIL_SUCCESS = 'FETCH_CONFIRM_EMAIL_SUCCESS'
export const FETCH_CONFIRM_EMAIL_FAILURE = 'FETCH_CONFIRM_EMAIL_FAILURE'

// ACTIONS

/*
 * Login request action
 *
 * @return {Object}
 */
function fetchLoginRequest() {
  return {
    type: FETCH_LOGIN_REQUEST,
  }
}


/*
 * Login success action
 *
 * @param (Object) res
 * @return {Object}
 */
function fetchLoginSuccess(res) {
  return {
    type: FETCH_LOGIN_SUCCESS,
    user: res.user,
    message: res.success,
    csrfAccessToken: res.access,
    csrfRefreshToken: res.refresh,
  }
}


/*
 * Login failure action
 *
 * @param (Object) res
 * @return {Object}
 */
function fetchLoginFailure(res) {
  return {
    type: FETCH_LOGIN_FAILURE,
    message: res.error || 'Something went wrong'
  }
}


/*
 * Token Login request action
 *
 * @return {Object}
 */
function fetchTokenLoginRequest() {
  return {
    type: FETCH_TOKEN_LOGIN_REQUEST,
  }
}


/*
 * Token Login success action
 *
 * @param (Object) res
 * @return {Object}
 */
function fetchTokenLoginSuccess(res) {
  return {
    type: FETCH_TOKEN_LOGIN_SUCCESS,
    user: res.user,
    csrfAccessToken: res.access,
    csrfRefreshToken: res.refresh,
  }
}


/*
 * Token Login failure action
 *
 * @param (Object) res
 * @return {Object}
 */
function fetchTokenLoginFailure(res) {
  return {
    type: FETCH_TOKEN_LOGIN_FAILURE,
    message: res.error || 'Something went wrong'
  }
}


// ACTION CREATORS

/**
 * Handles login with username and password request
 * and dispatches actions based on server response.
 *
 * @param {Object} user
 */
export function handleLogin (user) {
  return (dispatch) => {

    dispatch(showLoading())
    dispatch(fetchLoginRequest())

    return loginUser(user).then(res => {
      if (res.user) {
        dispatch(fetchLoginSuccess(res))
      } else {
        dispatch(fetchLoginFailure(res))
      }
    }).then(() => dispatch(hideLoading()))
  }
}


/**
 * Handles login with token request and
 * dispatches actions based on server response.
 * If access token is expired, it will try to
 * refresh the token and double submit login attempt.
 *
 * @return {function} refreshTokenWrapper
 */
export function handleLoginToken() {
  const args = []
  return refreshTokenWrapper(
    fetchTokenLoginRequest,
    fetchTokenLoginSuccess,
    fetchTokenLoginFailure,
    loginToken,
    args,
  )
}


/**
 * Handles login with OAuth provider request and
 * dispatches actions based on server response.
 *
 * @param {string} token
 * @param {string} provider
 */
export function handleLoginOAuth(oauth, provider) {
  return (dispatch, getState) => {
    const { brackets } = getState()
    dispatch(showLoading())
    dispatch(fetchLoginRequest())

    return loginOAuth(oauth, provider).then(res => {
      if (res.user) {
        dispatch(fetchLoginSuccess(res))
      } else {
        dispatch(fetchLoginFailure(res))
      }
    }).then(() => {
        if (brackets.unauthed) {
          dispatch(handleAddBracket(brackets.unauthed))
        }
    }).then(() => dispatch(hideLoading()))
  }
}


/**
 * Handles user logout request and dispatches
 * actions based on server response.
 *
 * @param {string} id
 */
export function handleLogout(id) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch({
        type: FETCH_LOGOUT_REQUEST,
        id,
    })

    return logoutUser().then(res => {
      if (res.success) {
        dispatch({
          type: FETCH_LOGOUT_SUCCESS,
          message: res.success,
        })
      } else {
        dispatch({
          type: FETCH_LOGOUT_FAILURE,
          message: res.error || 'Something went wrong',
        })
      }
    }).then(() => dispatch(hideLoading()))
  }
}


/**
 * Handles forgot password request and dispatches
 * actions based on server response.
 *
 * @param {string} username or email
 */
export function handleForgotPassword (username) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch({
      type: FETCH_FORGOT_PASSWORD_REQUEST,
      username,
    })

    return forgotPassword(username).then(res => {
      if (res.success) {
        dispatch({
          type: FETCH_FORGOT_PASSWORD_SUCCESS,
          message: res.success,
        })
      } else {
        dispatch({
          type: FETCH_FORGOT_PASSWORD_FAILURE,
          message: res.error || 'Something went wrong'
        })
      }
    }).then(() => dispatch(hideLoading()))
  }
}


/**
 * Handles confirm email request and dispatches
 * actions based on server response.
 *
 * @param {string} token
 */
export function handleConfirmEmail(token) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch({
      type: FETCH_CONFIRM_EMAIL_REQUEST,
      token,
    })

    return confirmEmail (token).then(res => {
      if (res.user) {
        dispatch({
          type: FETCH_CONFIRM_EMAIL_SUCCESS,
          user: res.user,
          message: res.success || 'Request successful',
          csrfAccessToken: res.access,
          csrfRefreshToken: res.refresh,
        })
      } else {
        dispatch({
          type: FETCH_CONFIRM_EMAIL_FAILURE,
          message: res.error || 'Something went wrong'
        })
      }
    }).then(() => dispatch(hideLoading()))
  }
}
