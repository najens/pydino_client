import { getBrackets, saveBracket, editBracket, deleteBracket
} from '../utils/apis/brackets'
import { refreshTokenWrapper } from './csrfAccessToken'
import { showLoading, hideLoading } from 'react-redux-loading'

// ACTION TYPES
export const FETCH_BRACKETS_REQUEST = 'FETCH_BRACKETS_REQUEST'
export const FETCH_BRACKETS_SUCCESS = 'FETCH_BRACKETS_SUCCESS'
export const FETCH_BRACKETS_FAILURE = 'FETCH_BRACKETS_FAILURE'
export const STORE_BRACKET = 'STORE_BRACKET'
export const FETCH_ADD_BRACKET_REQUEST = 'FETCH_ADD_BRACKET_REQUEST'
export const FETCH_ADD_BRACKET_SUCCESS = 'FETCH_ADD_BRACKET_SUCCESS'
export const FETCH_ADD_BRACKET_FAILURE = 'FETCH_ADD_BRACKET_FAILURE'
export const FETCH_EDIT_BRACKET_REQUEST = 'FETCH_EDIT_BRACKET_REQUEST'
export const FETCH_EDIT_BRACKET_SUCCESS = 'FETCH_EDIT_BRACKET_SUCCESS'
export const FETCH_EDIT_BRACKET_FAILURE = 'FETCH_EDIT_BRACKET_FAILURE'
export const FETCH_DELETE_BRACKET_REQUEST = 'FETCH_DELETE_BRACKET_REQUEST'
export const FETCH_DELETE_BRACKET_SUCCESS = 'FETCH_DELETE_BRACKET_SUCCESS'
export const FETCH_DELETE_BRACKET_FAILURE = 'FETCH_DELETE_BRACKET_FAILURE'

// ACTIONS

/*
 * Fetch brackets request action
 *
 * @return {Object}
 */
export function fetchBracketsRequest() {
  return {
    type: FETCH_BRACKETS_REQUEST
  }
}


/*
 * Fetch brackets success action
 *
 * @return {Object}
 */
export function fetchBracketsSuccess(res) {
  const brackets = res.brackets
  const newBrackets = {}
  if (typeof brackets !== 'undefined') {
    brackets.map((bracket) => (
      newBrackets[bracket.id] = bracket
    ))
  }
  return {
    type: FETCH_BRACKETS_SUCCESS,
    brackets: newBrackets,
    message: res.success,
  }
}


/*
 * Fetch brackets failure action
 *
 * @return {Object}
 */
export function fetchBracketsFailure(res) {
  return {
    type: FETCH_BRACKETS_FAILURE,
    message: res.error || 'Something went wrong!'
  }
}


/*
 * Store bracket action
 *
 * @return {Object}
 */
export function storeBracket(bracket) {
	return (dispatch) => {
		dispatch({
			type: STORE_BRACKET,
			bracket: bracket,
		})
	}
}


/**
 * Add bracket request action
 *
 * @return {Object}
 */
function fetchAddBracketRequest(bracket) {
	return {
		type: FETCH_ADD_BRACKET_REQUEST,
		bracket,
	}
}


/**
 * Add bracket success action
 *
 * @return {Object}
 */
function fetchAddBracketSuccess(res) {
	console.log('Res.user: ', res.user)
	return {
		type: FETCH_ADD_BRACKET_SUCCESS,
		bracket: res.bracket,
		message: res.success,
		user: res.user,
	}
}


/**
 * Add bracket failure action
 *
 * @return {Object}
 */
function fetchAddBracketFailure(res) {
	return {
		type: FETCH_ADD_BRACKET_FAILURE,
		message: res.error  || 'Something went wrong',
	}
}


/*
 * Edit bracket request action
 *
 * @return {Object}
 */
function fetchEditBracketRequest(bracket) {
  return {
    type: FETCH_EDIT_BRACKET_REQUEST,
    bracket,
  }
}


/*
 * Edit bracket success action
 *
 * @return {Object}
 */
function fetchEditBracketSuccess(res) {
  return {
    type: FETCH_EDIT_BRACKET_SUCCESS,
    bracket: res.bracket,
    message: res.success,
  }
}


/*
 * Edit bracket failure action
 *
 * @return {Object}
 */
function fetchEditBracketFailure(res) {
  return {
    type: FETCH_EDIT_BRACKET_FAILURE,
    message: res.error || 'Something went wrong',
  }
}


/*
 * Delete bracket request action
 *
 * @return {Object}
 */
function fetchDeleteBracketRequest(id) {
  return {
    type: FETCH_DELETE_BRACKET_REQUEST,
    id,
  }
}


/*
 * Delete bracket success action
 *
 * @return {Object}
 */
function fetchDeleteBracketSuccess(res) {
  return {
    type: FETCH_DELETE_BRACKET_SUCCESS,
    id: res.id,
    message: res.success,
  }
}


/*
 * Delete bracket failure action
 *
 * @return {Object}
 */
function fetchDeleteBracketFailure(res) {
  return {
    type: FETCH_DELETE_BRACKET_FAILURE,
    message: res.error || 'Something went wrong',
  }
}


// ACTION CREATORS

/**
 * Handles fetch bracket request and dispatches
 * actions based on server response.
 *
 * @param {Object} bracket
 * @return {function} refreshTokenWrapper
 */
export function handleFetchBracket() {
	return (dispatch) => {
		dispatch(showLoading())
	  dispatch(fetchBracketsRequest())
	  return getBrackets().then(res => {
			if (res.success) {
				dispatch(fetchBracketsSuccess(res))
			}
			if (res.error) {
				dispatch(fetchBracketsFailure(res))
			}
		}).then(() => dispatch(hideLoading()))
	}
}


/**
 * Handles add bracket request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit add bracket request.
 *
 * @param {Object} bracket
 * @return {function} refreshTokenWrapper
 */
export function handleAddBracket(bracket) {
  const args = [bracket]
  return refreshTokenWrapper(
    fetchAddBracketRequest,
    fetchAddBracketSuccess,
    fetchAddBracketFailure,
    saveBracket,
    args,
  )
}


/**
 * Handles edit bracket request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit edit bracket request.
 *
 * @param {Object} bracket
 * @return {function} refreshTokenWrapper
 */
export function handleEditBracket(bracket) {
  const args = [bracket]
  return refreshTokenWrapper(
    fetchEditBracketRequest,
    fetchEditBracketSuccess,
    fetchEditBracketFailure,
    editBracket,
    args,
  )
}


/**
 * Handles delete bracket request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit delete bracket request.
 *
 * @param {string} id
 * @return {function} refreshTokenWrapper
 */
export function handleDeleteBracket(id) {
  const args = [id]
  return refreshTokenWrapper(
    fetchDeleteBracketRequest,
    fetchDeleteBracketSuccess,
    fetchDeleteBracketFailure,
    deleteBracket,
    args,
  )
}
