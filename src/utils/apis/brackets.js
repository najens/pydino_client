import axios from 'axios'
import DOMAIN from './config'

// Url and API Endpoints
const API_ENDPOINT = DOMAIN + 'api/v1/'
const BRACKET_ENDPOINT = API_ENDPOINT + 'bracket'

/**
 * Get all brackets
 *
 * @return {Object} 200
 *    num_results: {string}
 *    success: {string}
 *    brackets: {Array<Object>}
 * @throws {Exception<Object>}
 *    error: {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const getBrackets = () =>
  axios(BRACKET_ENDPOINT, {
    withCredentials: true,
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


	/**
	 * Save a new bracket
	 *
	 * @param {object} bracket
	 * @return {object} 200
	 *		bracket: {object}
	 *    succes: {string}
	 * @throws {Exception<Object>}
	 *    error: {string} Authorization 401
	 *           {string} MissingData 400
	 *           {string} IntegrityError 400
	 *           {string} SQLAlchemyError 400
	 */
	export const saveBracket = (csrfAccessToken, bracket) =>
	  axios(BRACKET_ENDPOINT, {
	    method: 'post',
	    withCredentials: true,
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
        'X-CSRF-Token': csrfAccessToken,
	    },
	    data: JSON.stringify(bracket)
	  })
	  .then(res => res.data)
	  .catch(err => {
	    console.log(err.response)
	    return err.response.data
	  })


/**
 * Edit a bracket
 *
 * @param {string} csrfAccessToken
 * @param {Object} bracket
 * @return {Object} 200
 *    success: {string}
 *    bracket: {Object}
 * @throws {Exception<Object>}
 *    error: {string} InvalidID 400
 *           {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const editBracket = (csrfAccessToken, bracket) =>
  axios(`${BRACKET_ENDPOINT}/${bracket.id}`, {
    method: 'put',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfAccessToken,
    },
    data: JSON.stringify(bracket)
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


/**
 * Delete a bracket
 *
 * @param {string} csrfAccessToken
 * @param {string} id
 * @return {Object} 200
 *    success: {string}
 * @throws {Exception<Object>}
 *    error: {string} InvalidID 400
 *           {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const deleteBracket = (csrfAccessToken, id) =>
  axios(`${BRACKET_ENDPOINT}/${id}`, {
    method: 'delete',
    withCredentials: true,
    headers: {
      'X-CSRF-Token': csrfAccessToken,
    }
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })
