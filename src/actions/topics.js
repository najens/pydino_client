import { saveTopic, editTopic, deleteTopic } from '../utils/apis/topics'
import { refreshTokenWrapper } from './csrfAccessToken'

// ACTION TYPES
export const FETCH_TOPICS_REQUEST = 'FETCH_TOPICS_REQUEST'
export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS'
export const FETCH_TOPICS_FAILURE = 'FETCH_TOPICS_FAILURE'
export const FETCH_ADD_TOPIC_REQUEST = 'FETCH_ADD_TOPIC_REQUEST'
export const FETCH_ADD_TOPIC_SUCCESS = 'FETCH_ADD_TOPIC_SUCCESS'
export const FETCH_ADD_TOPIC_FAILURE = 'FETCH_ADD_TOPIC_FAILURE'
export const FETCH_EDIT_TOPIC_REQUEST = 'FETCH_EDIT_TOPIC_REQUEST'
export const FETCH_EDIT_TOPIC_SUCCESS = 'FETCH_EDIT_TOPIC_SUCCESS'
export const FETCH_EDIT_TOPIC_FAILURE = 'FETCH_EDIT_TOPIC_FAILURE'
export const FETCH_DELETE_TOPIC_REQUEST = 'FETCH_DELETE_TOPIC_REQUEST'
export const FETCH_DELETE_TOPIC_SUCCESS = 'FETCH_DELETE_TOPIC_SUCCESS'
export const FETCH_DELETE_TOPIC_FAILURE = 'FETCH_DELETE_TOPIC_FAILURE'

// ACTIONS

/*
 * Fetch topics request action
 *
 * @return {Object}
 */
export function fetchTopicsRequest() {
  return {
    type: FETCH_TOPICS_REQUEST
  }
}


/*
 * Fetch topics success action
 *
 * @return {Object}
 */
export function fetchTopicsSuccess(res) {
  const topics = res.topics
  const newTopics = {}
  if (typeof topics !== 'undefined') {
    topics.map((topic) => (
      newTopics[topic.id] = topic
    ))
  }
  return {
    type: FETCH_TOPICS_SUCCESS,
    topics: newTopics,
    message: res.success,
  }
}


/*
 * Fetch topics failure action
 *
 * @return {Object}
 */
export function fetchTopicsFailure(res) {
  return {
    type: FETCH_TOPICS_FAILURE,
    message: res.error || 'Something went wrong!'
  }
}


/**
 * Add topic request action
 *
 * @return {Object}
 */
function fetchAddTopicRequest(topic) {
	return {
		type: FETCH_ADD_TOPIC_REQUEST,
		topic,
	}
}


/**
 * Add topic success action
 *
 * @return {Object}
 */
function fetchAddTopicSuccess(res) {
	return {
		type: FETCH_ADD_TOPIC_SUCCESS,
		topic: res.topic,
		message: res.success,
	}
}


/**
 * Add topic failure action
 *
 * @return {Object}
 */
function fetchAddTopicFailure(res) {
	return {
		type: FETCH_ADD_TOPIC_FAILURE,
		message: res.error  || 'Something went wrong',
	}
}


/*
 * Edit topic request action
 *
 * @return {Object}
 */
function fetchEditTopicRequest(topic) {
  return {
    type: FETCH_EDIT_TOPIC_REQUEST,
    topic,
  }
}


/*
 * Edit topic success action
 *
 * @return {Object}
 */
function fetchEditTopicSuccess(res) {
  return {
    type: FETCH_EDIT_TOPIC_SUCCESS,
    topic: res.topic,
    message: res.success,
  }
}


/*
 * Edit topic failure action
 *
 * @return {Object}
 */
function fetchEditTopicFailure(res) {
  return {
    type: FETCH_EDIT_TOPIC_FAILURE,
    message: res.error || 'Something went wrong',
  }
}


/*
 * Delete topic request action
 *
 * @return {Object}
 */
function fetchDeleteTopicRequest(id) {
  return {
    type: FETCH_DELETE_TOPIC_REQUEST,
    id,
  }
}


/*
 * Delete topic success action
 *
 * @return {Object}
 */
function fetchDeleteTopicSuccess(res) {
  return {
    type: FETCH_DELETE_TOPIC_SUCCESS,
    id: res.id,
    message: res.success,
  }
}


/*
 * Delete topic failure action
 *
 * @return {Object}
 */
function fetchDeleteTopicFailure(res) {
  return {
    type: FETCH_DELETE_TOPIC_FAILURE,
    message: res.error || 'Something went wrong',
  }
}


// ACTION CREATORS

/**
 * Handles add topic request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit add topic request.
 *
 * @param {Object} topic
 * @return {function} refreshTokenWrapper
 */
export function handleAddTopic(topic) {
  const args = [topic]
  return refreshTokenWrapper(
    fetchAddTopicRequest,
    fetchAddTopicSuccess,
    fetchAddTopicFailure,
    saveTopic,
    args,
  )
}


/**
 * Handles edit topic request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit edit topic request.
 *
 * @param {object} topic
 * @return {function} refreshTokenWrapper
 */
export function handleEditTopic(topic) {
  const args = [topic]
  return refreshTokenWrapper(
    fetchEditTopicRequest,
    fetchEditTopicSuccess,
    fetchEditTopicFailure,
    editTopic,
    args,
  )
}


/**
 * Handles delete topic request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit delete topic request.
 *
 * @param {string} id
 * @return {function} refreshTokenWrapper
 */
export function handleDeleteTopic(id) {
  const args = [id]
  return refreshTokenWrapper(
    fetchDeleteTopicRequest,
    fetchDeleteTopicSuccess,
    fetchDeleteTopicFailure,
    deleteTopic,
    args,
  )
}
