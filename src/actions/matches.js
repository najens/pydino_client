import { saveMatch, editMatch, deleteMatch } from '../utils/apis/matches'
import { refreshTokenWrapper } from './csrfAccessToken'

// ACTION TYPES
export const FETCH_MATCHES_REQUEST = 'FETCH_MATCHES_REQUEST'
export const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS'
export const FETCH_MATCHES_FAILURE = 'FETCH_MATCHES_FAILURE'
export const FETCH_ADD_MATCH_REQUEST = 'FETCH_ADD_MATCH_REQUEST'
export const FETCH_ADD_MATCH_SUCCESS = 'FETCH_ADD_MATCH_SUCCESS'
export const FETCH_ADD_MATCH_FAILURE = 'FETCH_ADD_MATCH_FAILURE'
export const FETCH_EDIT_MATCH_REQUEST = 'FETCH_EDIT_MATCH_REQUEST'
export const FETCH_EDIT_MATCH_SUCCESS = 'FETCH_EDIT_MATCH_SUCCESS'
export const FETCH_EDIT_MATCH_FAILURE = 'FETCH_EDIT_MATCH_FAILURE'
export const FETCH_DELETE_MATCH_REQUEST = 'FETCH_DELETE_MATCH_REQUEST'
export const FETCH_DELETE_MATCH_SUCCESS = 'FETCH_DELETE_MATCH_SUCCESS'
export const FETCH_DELETE_MATCH_FAILURE = 'FETCH_DELETE_MATCH_FAILURE'

// ACTIONS

/*
 * Fetch matches request action
 *
 * @return {Object}
 */
export function fetchMatchesRequest() {
  return {
    type: FETCH_MATCHES_REQUEST
  }
}


/*
 * Fetch matches success action
 *
 * @return {Object}
 */
export function fetchMatchesSuccess(res) {
  const Matches = res.Matches
  const newMatches = {}
  if (typeof Matches !== 'undefined') {
    Matches.map((Match) => (
      newMatches[Match.id] = Match
    ))
  }
  return {
    type: FETCH_MATCHES_SUCCESS,
    Matches: newMatches,
    message: res.success,
  }
}


/*
 * Fetch matches failure action
 *
 * @return {Object}
 */
export function fetchMatchesFailure(res) {
  return {
    type: FETCH_MATCHES_FAILURE,
    message: res.error || 'Something went wrong!'
  }
}


/**
 * Add match request action
 *
 * @return {Object}
 */
function fetchAddMatchRequest(Match) {
	return {
		type: FETCH_ADD_MATCH_REQUEST,
		Match,
	}
}


/**
 * Add match success action
 *
 * @return {Object}
 */
function fetchAddMatchSuccess(res) {
	return {
		type: FETCH_ADD_MATCH_SUCCESS,
		Match: res.Match,
		message: res.success,
	}
}


/**
 * Add match failure action
 *
 * @return {Object}
 */
function fetchAddMatchFailure(res) {
	return {
		type: FETCH_ADD_MATCH_FAILURE,
		message: res.error  || 'Something went wrong',
	}
}


/*
 * Edit match request action
 *
 * @return {Object}
 */
function fetchEditMatchRequest(Match) {
  return {
    type: FETCH_EDIT_MATCH_REQUEST,
    Match,
  }
}


/*
 * Edit match success action
 *
 * @return {Object}
 */
function fetchEditMatchSuccess(res) {
  return {
    type: FETCH_EDIT_MATCH_SUCCESS,
    Match: res.Match,
    team1: res.team1,
    team2: res.team2,
    message: res.success,
  }
}


/*
 * Edit match failure action
 *
 * @return {Object}
 */
function fetchEditMatchFailure(res) {
  return {
    type: FETCH_EDIT_MATCH_FAILURE,
    message: res.error || 'Something went wrong',
  }
}


/*
 * Delete match request action
 *
 * @return {Object}
 */
function fetchDeleteMatchRequest(id) {
  return {
    type: FETCH_DELETE_MATCH_REQUEST,
    id,
  }
}


/*
 * Delete match success action
 *
 * @return {Object}
 */
function fetchDeleteMatchSuccess(res) {
  return {
    type: FETCH_DELETE_MATCH_SUCCESS,
    id: res.id,
    message: res.success,
  }
}


/*
 * Delete match failure action
 *
 * @return {Object}
 */
function fetchDeleteMatchFailure(res) {
  return {
    type: FETCH_DELETE_MATCH_FAILURE,
    message: res.error || 'Something went wrong',
  }
}


// ACTION CREATORS

/**
 * Handles add match request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit add match request.
 *
 * @param {Object} match
 * @return {function} refreshTokenWrapper
 */
export function handleAddMatch(Match) {
  const args = [Match]
  return refreshTokenWrapper(
    fetchAddMatchRequest,
    fetchAddMatchSuccess,
    fetchAddMatchFailure,
    saveMatch,
    args,
  )
}


/**
 * Handles edit match request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit edit match request.
 *
 * @param {Object} Match
 * @return {function} refreshTokenWrapper
 */
export function handleEditMatch(Match) {
  const args = [Match]
  return refreshTokenWrapper(
    fetchEditMatchRequest,
    fetchEditMatchSuccess,
    fetchEditMatchFailure,
    editMatch,
    args,
  )
}


/**
 * Handles delete match request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit delete match request.
 *
 * @param {string} id
 * @return {function} refreshTokenWrapper
 */
export function handleDeleteMatch(id) {
  const args = [id]
  return refreshTokenWrapper(
    fetchDeleteMatchRequest,
    fetchDeleteMatchSuccess,
    fetchDeleteMatchFailure,
    deleteMatch,
    args,
  )
}
