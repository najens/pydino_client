import { showLoading, hideLoading } from 'react-redux-loading'
import { mailContact } from '../utils/apis/contact'

// ACTION TYPES
export const FETCH_MAIL_CONTACT_REQUEST = 'FETCH_MAIL_CONTACT_REQUEST'
export const FETCH_MAIL_CONTACT_SUCCESS = 'FETCH_MAIL_CONTACT_SUCCESS'
export const FETCH_MAIL_CONTACT_FAILURE = 'FETCH_MAIL_CONTACT_FAILURE'

// ACTION CREATORS

/**
 * Handles request to mail contact info
 * and dispatches actions based on server response.
 *
 * @param {Object} contact
 */
export function handleMailContact(contact) {
	return (dispatch) => {
		dispatch(showLoading())
		dispatch({
			type: FETCH_MAIL_CONTACT_REQUEST,
		})

		return mailContact(contact).then(res => {
			if (res.success) {
				dispatch({
          type: FETCH_MAIL_CONTACT_SUCCESS,
          message: res.success,
        })
			} else {
				dispatch({
					type: FETCH_MAIL_CONTACT_FAILURE,
					message: res.error || 'Something went wrong'
				})
			}
			return res
		}).then(dispatch(hideLoading()))
	}
}
