import { showLoading, hideLoading } from 'react-redux-loading'
import { refreshToken } from '../utils/apis/login'

// ACTION TYPES
export const FETCH_ACCESS_TOKEN_REQUEST = 'FETCH_ACCESS_TOKEN_REQUEST'
export const FETCH_ACCESS_TOKEN_SUCCESS = 'FETCH_ACCESS_TOKEN_SUCCESS'
export const FETCH_ACCESS_TOKEN_FAILURE = 'FETCH_ACCESS_TOKEN_FAILURE'

// ACTION CREATORS

/**
 * Handles request to refresh access token
 * and dispatches actions based on server response.
 *
 * @param {Object} credentials
 */
function fetchAccessToken(csrfRefreshToken) {
	return (dispatch) => {
		dispatch({
			type: FETCH_ACCESS_TOKEN_REQUEST,
		})

		return refreshToken(csrfRefreshToken).then(res => {
			if (res.success) {
				dispatch({
          type: FETCH_ACCESS_TOKEN_SUCCESS,
          csrfAccessToken: res.access,
          message: res.success,
        })
			} else {
				dispatch({
					type: FETCH_ACCESS_TOKEN_FAILURE,
					message: res.error || 'Something went wrong'
				})
			}
			return res
		})
	}
}


/**
 * Wrapper function that handles access token refresh
 * and double submit requests for when a user's access
 * token expires and dispatches actions based on server
 * response.
 *
 * @param {function} reqFunc - action
 * @param {function} sucFunc - action
 * @param {function} failFunc - action
 * @param {function} apiFunc - api request
 * @ param {Array} args - api requst args
 */
export function refreshTokenWrapper(
	reqFunc, sucFunc, failFunc, apiFunc, args
) {
	return (dispatch, getState) => {
    const { csrfAccessToken, csrfRefreshToken } = getState()
    dispatch(showLoading())
    dispatch(reqFunc(...args))

		return apiFunc(csrfAccessToken, ...args).then(res => {
			if (res.success) {
				dispatch(sucFunc(res))
			} else if (res.url) {
				return dispatch(fetchAccessToken(csrfRefreshToken)).then(res => {
					if (res.access) {
						const { csrfAccessToken } = getState()
						return apiFunc(csrfAccessToken, ...args).then(res => {
							if (res.success) {
								dispatch(sucFunc(res))
							} else {
								dispatch(failFunc(res))
							}
						})
					} else {
						dispatch(failFunc(res))
					}
				})
			} else {
				dispatch(failFunc(res))
			}
		}).then(() => dispatch(hideLoading()))
	}
}
