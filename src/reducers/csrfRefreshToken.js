import { FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILURE, FETCH_TOKEN_LOGIN_SUCCESS,
  FETCH_TOKEN_LOGIN_FAILURE, FETCH_CONFIRM_EMAIL_SUCCESS, FETCH_LOGOUT_SUCCESS
} from '../actions/authedUser'
import { FETCH_REFRESH_TOKEN_SUCCESS } from '../actions/csrfRefreshToken'
import { FETCH_ADD_USER_SUCCESS } from '../actions/users'

/**
 * Updates csrfRefreshToken state in store each
 * time an action in switch case is called
 *
 * @param {Object} state - csrfRefreshToken
 * @param {Object} action
 * @return {Object} state - new csrfRefreshToken
 */
export default function csrfRefreshToken (state = null, action) {
  switch(action.type) {
    case FETCH_LOGIN_SUCCESS :
    case FETCH_REFRESH_TOKEN_SUCCESS :
    case FETCH_TOKEN_LOGIN_SUCCESS :
    case FETCH_CONFIRM_EMAIL_SUCCESS :
    case FETCH_ADD_USER_SUCCESS :
      return action.csrfRefreshToken
    case FETCH_LOGIN_FAILURE :
    case FETCH_TOKEN_LOGIN_FAILURE :
    case FETCH_LOGOUT_SUCCESS :
      return ''
    default :
      return state
    }
}
