import axios from 'axios'
import DOMAIN from './config'

// Url and API Endpoints
const API_ENDPOINT = DOMAIN + 'api/v1/'
const TEAM_ENDPOINT = API_ENDPOINT + 'team'

/**
 * Get all teams
 *
 * @return {Object} 200
 *    num_results: {string}
 *    success: {string}
 *    teams: {Array<Object>}
 * @throws {Exception<Object>}
 *    error: {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const getTeams = () =>
  axios(TEAM_ENDPOINT, {
    withCredentials: true,
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


	/**
	 * Save a new team
	 *
	 * @param {object} team
	 * @return {object} 200
	 *		team: {object}
	 *    succes: {string}
	 * @throws {Exception<Object>}
	 *    error: {string} Authorization 401
	 *           {string} MissingData 400
	 *           {string} IntegrityError 400
	 *           {string} SQLAlchemyError 400
	 */
	export const saveTeam = (csrfAccessToken, team) =>
	  axios(TEAM_ENDPOINT, {
	    method: 'post',
	    withCredentials: true,
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
        'X-CSRF-Token': csrfAccessToken,
	    },
	    data: JSON.stringify(team)
	  })
	  .then(res => res.data)
	  .catch(err => {
	    console.log(err.response)
	    return err.response.data
	  })


/**
 * Edit a team
 *
 * @param {string} csrfAccessToken
 * @param {Object} team
 * @return {Object} 200
 *    success: {string}
 *    team: {Object}
 * @throws {Exception<Object>}
 *    error: {string} InvalidID 400
 *           {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const editTeam = (csrfAccessToken, team) =>
  axios(`${TEAM_ENDPOINT}/${team.id}`, {
    method: 'put',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfAccessToken,
    },
    data: JSON.stringify(team)
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


/**
 * Delete a team
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
export const deleteTeam = (csrfAccessToken, id) =>
  axios(`${TEAM_ENDPOINT}/${id}`, {
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
