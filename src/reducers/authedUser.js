import { FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILURE, FETCH_TOKEN_LOGIN_SUCCESS,
  FETCH_TOKEN_LOGIN_FAILURE, FETCH_CONFIRM_EMAIL_SUCCESS, FETCH_LOGOUT_SUCCESS,
  FETCH_LOGOUT_REQUEST
} from '../actions/authedUser'
import { FETCH_ADD_USER_SUCCESS } from '../actions/users'

/**
 * Updates authedUser state in store each
 * time an action in switch case is called
 *
 * @param {Object} state - authedUser
 * @param {Object} action
 * @return {Object} state - new authedUser
 */
export default function authedUser(state = {}, action) {
  switch(action.type) {
    case FETCH_TOKEN_LOGIN_SUCCESS :
    case FETCH_CONFIRM_EMAIL_SUCCESS :
    case FETCH_ADD_USER_SUCCESS :
    case FETCH_LOGIN_SUCCESS :
      let roles = []
      action.user.roles.map((role) => (
        roles.push(role.name)
      ))
      return {
        ...state,
        ['id']: action.user.public_id,
        ['roles']: roles,
      }
    case FETCH_LOGIN_FAILURE :
    case FETCH_TOKEN_LOGIN_FAILURE :
    case FETCH_LOGOUT_REQUEST :
    case FETCH_LOGOUT_SUCCESS :
      return {}
    default :
      return state
  }
}
