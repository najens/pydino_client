import { FETCH_TEAMS_SUCCESS, FETCH_EDIT_TEAM_SUCCESS, FETCH_ADD_TEAM_SUCCESS,
  FETCH_DELETE_TEAM_SUCCESS,
} from '../actions/teams'
import { FETCH_EDIT_MATCH_SUCCESS } from '../actions/matches'
/**
 * Updates teams state in store each
 * time an action in switch case is called
 *
 * @param {Object} state - teams
 * @param {Object} action
 * @return {Object} state - new teams
 */
export default function teams (state = {}, action) {
  switch(action.type) {
    case FETCH_TEAMS_SUCCESS :
      return {
        ...state,
        ...action.teams
      }
    case FETCH_ADD_TEAM_SUCCESS :
    case FETCH_EDIT_TEAM_SUCCESS :
      return {
        ...state,
        [action.team.id]: action.team,
      }
    case FETCH_EDIT_MATCH_SUCCESS :
      return {
        ...state,
        [action.team1.id]: action.team1,
        [action.team2.id]: action.team2,
      }
    case FETCH_DELETE_TEAM_SUCCESS :
      delete state[action.id]
      return {
        ...state
      }
    default :
      return state
  }
}
