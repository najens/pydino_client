import { saveUser, editUser, resetPassword, changePassword, deleteUser
} from '../utils/apis/users'
import { showLoading, hideLoading } from 'react-redux-loading'
import { refreshTokenWrapper } from './csrfAccessToken'
import { handleAddBracket } from './brackets'

// ACTION TYPES
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'
export const FETCH_ADD_USER_REQUEST = 'FETCH_ADD_USER_REQUEST'
export const FETCH_ADD_USER_SUCCESS = 'FETCH_ADD_USER_SUCCESS'
export const FETCH_ADD_USER_FAILURE = 'FETCH_ADD_USER_FAILURE'
export const FETCH_EDIT_USER_REQUEST = 'FETCH_EDIT_USER_REQUEST'
export const FETCH_EDIT_USER_SUCCESS = 'FETCH_EDIT_USER_SUCCESS'
export const FETCH_EDIT_USER_FAILURE = 'FETCH_EDIT_USER_FAILURE'
export const FETCH_CHANGE_PASSWORD_REQUEST = 'FETCH_RESET_PASSWORD_REQUEST'
export const FETCH_CHANGE_PASSWORD_SUCCESS = 'FETCH_RESET_PASSWORD_SUCCESS'
export const FETCH_CHANGE_PASSWORD_FAILURE = 'FETCH_RESET_PASSWORD_FAILURE'
export const FETCH_DELETE_USER_REQUEST = 'FETCH_DELETE_USER_REQUEST'
export const FETCH_DELETE_USER_SUCCESS = 'FETCH_DELETE_USER_SUCCESS'
export const FETCH_DELETE_USER_FAILURE = 'FETCH_DELETE_USER_FAILURE'

// ACTIONS

/*
 * Fetch users request action
 *
 * @return {Object}
 */
export function fetchUsersRequest() {
  return {
    type: FETCH_USERS_REQUEST
  }
}


/*
 * Fetch users success action
 *
 * @return {Object}
 */
export function fetchUsersSuccess(res) {
  const users = res.users
  const newUsers = {}
  if (typeof users !== 'undefined') {
    users.map((user) => (
      newUsers[user.public_id] = user
    ))
  }
  return {
    type: FETCH_USERS_SUCCESS,
    users: newUsers,
    message: res.success,
  }
}


/*
 * Fetch users failure action
 *
 * @return {Object}
 */
export function fetchUsersFailure(res) {
  return {
    type: FETCH_USERS_FAILURE,
    message: res.error || 'Something went wrong!'
  }
}


/*
 * Edit user request action
 *
 * @return {Object}
 */
function fetchEditUserRequest(user) {
  return {
    type: FETCH_EDIT_USER_REQUEST,
    user,
  }
}


/*
 * Edit user success action
 *
 * @return {Object}
 */
function fetchEditUserSuccess(res) {
  return {
    type: FETCH_EDIT_USER_SUCCESS,
    user: res.user,
    message: res.success || 'User created.'
  }
}


/*
 * Edit user failure action
 *
 * @return {Object}
 */
function fetchEditUserFailure(res) {
  return {
    type: FETCH_EDIT_USER_FAILURE,
    message: res.error || 'Something went wrong',
  }
}


/*
 * Change password request action
 *
 * @return {Object}
 */
function fetchChangePasswordRequest() {
  return {
    type: FETCH_CHANGE_PASSWORD_REQUEST,
  }
}


/*
 * Change password success action
 *
 * @return {Object}
 */
function fetchChangePasswordSuccess(res) {
  return {
    type: FETCH_CHANGE_PASSWORD_SUCCESS,
    message: res.success,
  }
}


/*
 * Change password failure action
 *
 * @return {Object}
 */
function fetchChangePasswordFailure(res) {
  return {
    type: FETCH_CHANGE_PASSWORD_FAILURE,
    message: res.error || 'Something went wrong'
  }
}


/*
 * Delete user request action
 *
 * @return {Object}
 */
function fetchDeleteUserRequest(id) {
  return {
    type: FETCH_DELETE_USER_REQUEST,
    id,
  }
}


/*
 * Delete user success action
 *
 * @return {Object}
 */
function fetchDeleteUserSuccess(res) {
  return {
    type: FETCH_DELETE_USER_SUCCESS,
    id: res.id,
    message: res.success || 'User created.'
  }
}


/*
 * Delete user failure action
 *
 * @return {Object}
 */
function fetchDeleteUserFailure(res) {
  return {
    type: FETCH_DELETE_USER_FAILURE,
    message: res.error || 'Something went wrong',
  }
}


// ACTION CREATORS

/**
 * Handles add user request and dispatches
 * actions based on server response.
 *
 * @param {Object} user
 */
export function handleAddUser(user) {
  return (dispatch, getState) => {
    const { brackets } = getState()
    dispatch(showLoading())
    dispatch({
      type: FETCH_ADD_USER_REQUEST,
      user,
    })

    return saveUser(user).then(res => {
      if (res.success) {
        dispatch({
          type: FETCH_ADD_USER_SUCCESS,
          message: res.success,
          user: res.user,
          csrfAccessToken: res.access,
          csrfRefreshToken: res.refresh,
        })
        return res
      } else {
        dispatch({
          type: FETCH_ADD_USER_FAILURE,
          message: res.error  || 'Something went wrong',
        })
      }
    }).then(() => {
        if (brackets.unauthed) {
          dispatch(handleAddBracket(brackets.unauthed))
        }
    }).then(() => dispatch(hideLoading()))
  }
}


/**
 * Handles edit user request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit edit user request.
 *
 * @param {Object} user
 * @return {function} refreshTokenWrapper
 */
export function handleEditUser(user) {
  const args = [user]
  return refreshTokenWrapper(
    fetchEditUserRequest,
    fetchEditUserSuccess,
    fetchEditUserFailure,
    editUser,
    args,
  )
}


/**
 * Handles reset password request and dispatches
 * actions based on server response.
 *
 * @param {Object} credentials
 */
export function handleResetPassword (credentials) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(fetchChangePasswordRequest())

    return resetPassword(credentials).then(res => {
      if (res.user) {
        dispatch(fetchChangePasswordSuccess(res))
      } else {
        dispatch(fetchChangePasswordFailure(res))
      }
    }).then(() => dispatch(hideLoading()))
  }
}


/**
 * Handles change password request and
 * dispatches actions based on server response.
 * If access token is expired, it will try to
 * refresh the token and double submit change
 * password attempt.
 *
 * @param {Object} credentials
 * @return {function} refreshTokenWrapper
 */
export function handleChangePassword(credentials) {
  const args = [credentials]
  return refreshTokenWrapper(
    fetchChangePasswordRequest,
    fetchChangePasswordSuccess,
    fetchChangePasswordFailure,
    changePassword,
    args,
  )
}


/**
 * Handles delete user request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit delete user request.
 *
 * @param {string} id
 * @return {function} refreshTokenWrapper
 */
export function handleDeleteUser(id) {
  const args = [id]
  return refreshTokenWrapper(
    fetchDeleteUserRequest,
    fetchDeleteUserSuccess,
    fetchDeleteUserFailure,
    deleteUser,
    args,
  )
}
