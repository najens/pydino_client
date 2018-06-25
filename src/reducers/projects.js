import { FETCH_PROJECTS_SUCCESS, FETCH_ADD_PROJECT_SUCCESS,
	FETCH_EDIT_PROJECT_SUCCESS, FETCH_DELETE_PROJECT_SUCCESS
} from '../actions/projects'

/**
 * Updates projects state in store each
 * time an action in switch case is called
 *
 * @param {Object} state - projects
 * @param {Object} action
 * @return {Object} state - new projects
 */
export default function projects (state = {}, action) {
  switch(action.type) {
    case FETCH_PROJECTS_SUCCESS :
      return {
        ...state,
        ...action.projects
      }
    case FETCH_ADD_PROJECT_SUCCESS :
    case FETCH_EDIT_PROJECT_SUCCESS :
      return {
        ...state,
        [action.project.id]: action.project,
      }
		case FETCH_DELETE_PROJECT_SUCCESS :
			delete state[action.id]
			return {
				...state
			}
    default :
      return state
  }
}
