import axios from 'axios'
import DOMAIN from '../../config'

// Url and API Endpoints
const API_ENDPOINT = DOMAIN + 'api/v1/'
const TOPIC_ENDPOINT = API_ENDPOINT + 'topic'

/**
 * Get all topics
 *
 * @return {Object} 200
 *    num_results: {string}
 *    success: {string}
 *    topics: {Array<Object>}
 * @throws {Exception<Object>}
 *    error: {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const getTopics = () =>
  axios(TOPIC_ENDPOINT, {
    withCredentials: true,
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


	/**
	 * Save a new topic
	 *
	 * @param {object} project
	 * @return {object} 200
	 *		topic: {object}
	 *    succes: {string}
	 * @throws {Exception<Object>}
	 *    error: {string} Authorization 401
	 *           {string} MissingData 400
	 *           {string} IntegrityError 400
	 *           {string} SQLAlchemyError 400
	 */
	export const saveTopic = (csrfAccessToken, topic) =>
	  axios(TOPIC_ENDPOINT, {
	    method: 'post',
	    withCredentials: true,
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
        'X-CSRF-Token': csrfAccessToken,
	    },
	    data: JSON.stringify(topic)
	  })
	  .then(res => res.data)
	  .catch(err => {
	    console.log(err.response)
	    return err.response.data
	  })


/**
 * Edit a topic
 *
 * @param {string} csrfAccessToken
 * @param {Object} topic
 * @return {Object} 200
 *    success: {string}
 *    topic: {Object}
 * @throws {Exception<Object>}
 *    error: {string} InvalidID 400
 *           {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const editTopic = (csrfAccessToken, topic) =>
  axios(`${TOPIC_ENDPOINT}/${topic.id}`, {
    method: 'put',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfAccessToken,
    },
    data: JSON.stringify(topic)
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


/**
 * Delete a topic
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
export const deleteTopic = (csrfAccessToken, id) =>
  axios(`${TOPIC_ENDPOINT}/${id}`, {
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
