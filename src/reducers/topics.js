import { FETCH_TOPICS_SUCCESS, FETCH_EDIT_TOPIC_SUCCESS,
	FETCH_ADD_TOPIC_SUCCESS, FETCH_DELETE_TOPIC_SUCCESS,
} from '../actions/topics'

/**
 * Updates topics state in store each
 * time an action in switch case is called
 *
 * @param {Object} state - topics
 * @param {Object} action
 * @return {Object} state - new topics
 */
export default function topics (state = {}, action) {
  switch(action.type) {
    case FETCH_TOPICS_SUCCESS :
      return {
        ...state,
        ...action.topics
      }
    case FETCH_ADD_TOPIC_SUCCESS :
    case FETCH_EDIT_TOPIC_SUCCESS :
      return {
        ...state,
        [action.topic.id]: action.topic,
      }
    case FETCH_DELETE_TOPIC_SUCCESS :
      delete state[action.id]
      return {
        ...state
      }
    default :
      return state
  }
}
