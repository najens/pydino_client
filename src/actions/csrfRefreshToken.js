// ACTION TYPES
export const FETCH_REFRESH_TOKEN_REQUEST = 'FETCH_REFRESH_TOKEN_REQUEST'
export const FETCH_REFRESH_TOKEN_SUCCESS = 'FETCH_REFRESH_TOKEN_SUCCESS'
export const FETCH_REFRESH_TOKEN_FAILURE = 'FETCH_REFRESH_TOKEN_FAILURE'

// ACTIONS

/*
 * Fetch refresh token request action
 *
 * @return {Object}
 */
export function fetchRefreshTokenRequest() {
	return {
		type: FETCH_REFRESH_TOKEN_REQUEST,
	}
}


/*
 * Fetch refresh token success action
 *
 * @return {Object}
 */
export function fetchRefreshTokenSuccess(res) {
	return {
		type: FETCH_REFRESH_TOKEN_SUCCESS,
		csrfRefreshToken: res.csrf_refresh_token,
		message: res.success,
	}
}

/*
 * Fetch refresh token failure action
 *
 * @return {Object}
 */
export function fetchRefreshTokenFailure(res) {
	return {
		type: FETCH_REFRESH_TOKEN_FAILURE,
		message: res.error || 'Something went wrong!'
	}
}
