import axios from 'axios'
import DOMAIN from './config'

// Url and API Endpoints
const API_ENDPOINT = DOMAIN + 'api/v1/'
const PROJECT_ENDPOINT = API_ENDPOINT + 'project'

/**
 * Get all projects
 *
 * @return {Object} 200
 *    num_results: {string}
 *    success: {string}
 *    projects: {Array<Object>}
 * @throws {Exception<Object>}
 *    error: {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const getProjects = () =>
  axios(PROJECT_ENDPOINT, {
    withCredentials: true,
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


	/**
	 * Save a new project
	 *
	 * @param {object} project
	 * @return {object} 200
	 *		project: {object}
	 *    succes: {string}
	 * @throws {Exception<Object>}
	 *    error: {string} Authorization 401
	 *           {string} MissingData 400
	 *           {string} IntegrityError 400
	 *           {string} SQLAlchemyError 400
	 */
	export const saveProject = (csrfAccessToken, project) =>
	  axios(PROJECT_ENDPOINT, {
	    method: 'post',
	    withCredentials: true,
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
        'X-CSRF-Token': csrfAccessToken,
	    },
	    data: JSON.stringify(project)
	  })
	  .then(res => res.data)
	  .catch(err => {
	    console.log(err.response)
	    return err.response.data
	  })


/**
 * Edit a project
 *
 * @param {string} csrfAccessToken
 * @param {Object} project
 * @return {Object} 200
 *    success: {string}
 *    project: {Object}
 * @throws {Exception<Object>}
 *    error: {string} InvalidID 400
 *           {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const editProject = (csrfAccessToken, project) =>
  axios(`${PROJECT_ENDPOINT}/${project.id}`, {
    method: 'put',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfAccessToken,
    },
    data: JSON.stringify(project)
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


/**
 * Delete a project
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
export const deleteProject = (csrfAccessToken, id) =>
  axios(`${PROJECT_ENDPOINT}/${id}`, {
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
