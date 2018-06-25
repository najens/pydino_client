import { FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILURE, FETCH_TOKEN_LOGIN_SUCCESS,
  FETCH_TOKEN_LOGIN_FAILURE, FETCH_CONFIRM_EMAIL_SUCCESS, FETCH_LOGOUT_SUCCESS
} from '../actions/authedUser'
import { FETCH_ACCESS_TOKEN_SUCCESS } from '../actions/csrfAccessToken'
import { FETCH_ADD_USER_SUCCESS } from '../actions/users'

/**
 * Updates csrfAccessToken state in store each
 * time an action in switch case is called
 *
 * @param {Object} state - csrfAccessToken
 * @param {Object} action
 * @return {Object} state - new csrfAccessToken
 */
export default function csrfAccessToken (state = null, action) {
  switch(action.type) {
    case FETCH_LOGIN_SUCCESS :
    case FETCH_ACCESS_TOKEN_SUCCESS :
    case FETCH_TOKEN_LOGIN_SUCCESS :
    case FETCH_CONFIRM_EMAIL_SUCCESS :
    case FETCH_ADD_USER_SUCCESS :
      return action.csrfAccessToken
    case FETCH_LOGIN_FAILURE :
    case FETCH_TOKEN_LOGIN_FAILURE :
    case FETCH_LOGOUT_SUCCESS :
      return ''
    default :
      return state
  }
}
