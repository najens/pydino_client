import { saveTeam, editTeam, deleteTeam } from '../utils/apis/teams'
import { refreshTokenWrapper } from './csrfAccessToken'

// ACTION TYPES
export const FETCH_TEAMS_REQUEST = 'FETCH_TEAMS_REQUEST'
export const FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS'
export const FETCH_TEAMS_FAILURE = 'FETCH_TEAMS_FAILURE'
export const FETCH_ADD_TEAM_REQUEST = 'FETCH_ADD_TEAM_REQUEST'
export const FETCH_ADD_TEAM_SUCCESS = 'FETCH_ADD_TEAM_SUCCESS'
export const FETCH_ADD_TEAM_FAILURE = 'FETCH_ADD_TEAM_FAILURE'
export const FETCH_EDIT_TEAM_REQUEST = 'FETCH_EDIT_TEAM_REQUEST'
export const FETCH_EDIT_TEAM_SUCCESS = 'FETCH_EDIT_TEAM_SUCCESS'
export const FETCH_EDIT_TEAM_FAILURE = 'FETCH_EDIT_TEAM_FAILURE'
export const FETCH_DELETE_TEAM_REQUEST = 'FETCH_DELETE_TEAM_REQUEST'
export const FETCH_DELETE_TEAM_SUCCESS = 'FETCH_DELETE_TEAM_SUCCESS'
export const FETCH_DELETE_TEAM_FAILURE = 'FETCH_DELETE_TEAM_FAILURE'

// ACTIONS

/*
 * Fetch teams request action
 *
 * @return {Object}
 */
export function fetchTeamsRequest() {
  return {
    type: FETCH_TEAMS_REQUEST
  }
}


/*
 * Fetch teams success action
 *
 * @return {Object}
 */
export function fetchTeamsSuccess(res) {
  const teams = res.teams
  const newTeams = {}
  if (typeof teams !== 'undefined') {
    teams.map((team) => (
      newTeams[team.id] = team
    ))
  }
  return {
    type: FETCH_TEAMS_SUCCESS,
    teams: newTeams,
    message: res.success,
  }
}


/*
 * Fetch teams failure action
 *
 * @return {Object}
 */
export function fetchTeamsFailure(res) {
  return {
    type: FETCH_TEAMS_FAILURE,
    message: res.error || 'Something went wrong!'
  }
}


/**
 * Add team request action
 *
 * @return {Object}
 */
function fetchAddTeamRequest(team) {
	return {
		type: FETCH_ADD_TEAM_REQUEST,
		team,
	}
}


/**
 * Add team success action
 *
 * @return {Object}
 */
function fetchAddTeamSuccess(res) {
	return {
		type: FETCH_ADD_TEAM_SUCCESS,
		team: res.team,
		message: res.success,
	}
}


/**
 * Add team failure action
 *
 * @return {Object}
 */
function fetchAddTeamFailure(res) {
	return {
		type: FETCH_ADD_TEAM_FAILURE,
		message: res.error  || 'Something went wrong',
	}
}


/**
 * Edit team request action
 *
 * @return {Object}
 */
function fetchEditTeamRequest(team) {
	return {
		type: FETCH_EDIT_TEAM_REQUEST,
		team,
	}
}


/**
 * Edit team success action
 *
 * @return {Object}
 */
function fetchEditTeamSuccess(res) {
	return {
		type: FETCH_EDIT_TEAM_SUCCESS,
		team: res.team,
		message: res.success,
	}
}


/**
 * Edit team failure action
 *
 * @return {Object}
 */
function fetchEditTeamFailure(res) {
	return {
		type: FETCH_EDIT_TEAM_FAILURE,
		message: res.error  || 'Something went wrong',
	}
}


/**
 * Delete team request action
 *
 * @return {Object}
 */
function fetchDeleteTeamRequest(id) {
	return {
		type: FETCH_DELETE_TEAM_REQUEST,
		id,
	}
}


/**
 * Delete team success action
 *
 * @return {Object}
 */
function fetchDeleteTeamSuccess(res) {
	return {
		type: FETCH_DELETE_TEAM_SUCCESS,
		id: res.id,
		message: res.success,
	}
}


/**
 * Delete team failure action
 *
 * @return {Object}
 */
function fetchDeleteTeamFailure(res) {
	return {
		type: FETCH_DELETE_TEAM_FAILURE,
		message: res.error  || 'Something went wrong',
	}
}


// ACTION CREATORS

/**
 * Handles add team request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit add team request.
 *
 * @param {Object} team
 * @return {function} refreshTokenWrapper
 */
export function handleAddTeam(team) {
  const args = [team]
  return refreshTokenWrapper(
    fetchAddTeamRequest,
    fetchAddTeamSuccess,
    fetchAddTeamFailure,
    saveTeam,
    args,
  )
}


/**
 * Handles edit team request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit edit team request.
 *
 * @param {Object} team
 * @return {function} refreshTokenWrapper
 */
export function handleEditTeam(team) {
  const args = [team]
  return refreshTokenWrapper(
    fetchEditTeamRequest,
    fetchEditTeamSuccess,
    fetchEditTeamFailure,
    editTeam,
    args,
  )
}


/**
 * Handles delete team request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit delete team request.
 *
 * @param {string} id
 * @return {function} refreshTokenWrapper
 */
export function handleDeleteTeam(id) {
  const args = [id]
  return refreshTokenWrapper(
    fetchDeleteTeamRequest,
    fetchDeleteTeamSuccess,
    fetchDeleteTeamFailure,
    deleteTeam,
    args,
  )
}
