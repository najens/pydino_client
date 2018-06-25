import { FETCH_MATCHES_SUCCESS, FETCH_ADD_MATCH_SUCCESS,
	FETCH_EDIT_MATCH_SUCCESS, FETCH_DELETE_MATCH_SUCCESS
} from '../actions/matches'

/**
 * Updates matches state in store each
 * time an action in switch case is called
 *
 * @param {Object} state - matches
 * @param {Object} action
 * @return {Object} state - new matches
 */
export default function matches (state = {}, action) {
  switch(action.type) {
    case FETCH_MATCHES_SUCCESS :
      return {
        ...state,
        ...action.Matches
      }
    case FETCH_ADD_MATCH_SUCCESS :
    case FETCH_EDIT_MATCH_SUCCESS :
      return {
        ...state,
        [action.Match.id]: action.Match,
      }
		case FETCH_DELETE_MATCH_SUCCESS :
			delete state[action.id]
			return {
				...state
			}
    default :
      return state
  }
}
