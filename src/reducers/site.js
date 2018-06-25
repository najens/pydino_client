import { CHANGE_SITE } from '../actions/site'

/**
 * Updates site state in store each
 * time an action in switch case is called
 *
 * @param {Object} state - site
 * @param {Object} action
 * @return {Object} state - new site
 */
export default function site (state = 'pydino', action) {
  switch(action.type) {
    case CHANGE_SITE :
      return {
        ...action.site
      }
    default :
      return state
  }
}
