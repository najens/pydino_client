import { FETCH_USERS_SUCCESS, FETCH_ADD_USER_SUCCESS, FETCH_EDIT_USER_SUCCESS,
  FETCH_DELETE_USER_SUCCESS,
} from '../actions/users'
import { FETCH_CONFIRM_EMAIL_SUCCESS, FETCH_LOGOUT_SUCCESS, FETCH_LOGIN_SUCCESS
} from '../actions/authedUser'
import { FETCH_ADD_BRACKET_SUCCESS } from '../actions/brackets'

/**
 * Updates users state in store each
 * time an action in switch case is called
 *
 * @param {Object} state - users
 * @param {Object} action
 * @return {Object} state - new users
 */
export default function users (state = {}, action) {
  switch(action.type) {
    case FETCH_USERS_SUCCESS :
      return {
        ...state,
        ...action.users
      }
    case FETCH_CONFIRM_EMAIL_SUCCESS :
    case FETCH_ADD_USER_SUCCESS :
    case FETCH_EDIT_USER_SUCCESS :
    case FETCH_LOGIN_SUCCESS :
    case FETCH_ADD_BRACKET_SUCCESS :
      return {
        ...state,
        [action.user.public_id]: action.user,
      }
    case FETCH_DELETE_USER_SUCCESS :
      delete state[action.id]
      return {
        ...state
      }
    default :
      return state
  }
}
