import axios from 'axios'
import DOMAIN from './config'

// Url and API Endpoints
const API_ENDPOINT = DOMAIN + 'api/v1/'
const MATCH_ENDPOINT = API_ENDPOINT + 'match'

/**
 * Get all matches
 *
 * @return {Object} 200
 *    num_results: {string}
 *    success: {string}
 *    matches: {Array<Object>}
 * @throws {Exception<Object>}
 *    error: {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const getMatches = () =>
  axios(MATCH_ENDPOINT, {
    withCredentials: true,
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


	/**
	 * Save a new match
	 *
	 * @param {object} match
	 * @return {object} 200
	 *		match: {object}
	 *    succes: {string}
	 * @throws {Exception<Object>}
	 *    error: {string} Authorization 401
	 *           {string} MissingData 400
	 *           {string} IntegrityError 400
	 *           {string} SQLAlchemyError 400
	 */
	export const saveMatch = (csrfAccessToken, Match) =>
	  axios(MATCH_ENDPOINT, {
	    method: 'post',
	    withCredentials: true,
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
        'X-CSRF-Token': csrfAccessToken,
	    },
	    data: JSON.stringify(Match)
	  })
	  .then(res => res.data)
	  .catch(err => {
	    console.log(err.response)
	    return err.response.data
	  })


/**
 * Edit a match
 *
 * @param {string} csrfAccessToken
 * @param {Object} match
 * @return {Object} 200
 *    success: {string}
 *    match: {Object}
 * @throws {Exception<Object>}
 *    error: {string} InvalidID 400
 *           {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const editMatch = (csrfAccessToken, Match) =>
  axios(`${MATCH_ENDPOINT}/${Match.id}`, {
    method: 'put',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfAccessToken,
    },
    data: JSON.stringify(Match)
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


/**
 * Delete a match
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
export const deleteMatch = (csrfAccessToken, id) =>
  axios(`${MATCH_ENDPOINT}/${id}`, {
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
