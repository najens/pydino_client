import { combineReducers } from 'redux'
import users from './users'
import authedUser from './authedUser'
import isFetching from './isFetching'
import errorMessage from './errorMessage'
import successMessage from './successMessage'
import { loadingBarReducer } from 'react-redux-loading'
import csrfAccessToken from './csrfAccessToken'
import csrfRefreshToken from './csrfRefreshToken'
import projects from './projects'
import teams from './teams'
import matches from './matches'
import brackets from './brackets'
import topics from './topics'

// Combines all reducers that
// will be passed to the store
export default combineReducers({
  users,
  authedUser,
  isFetching,
  errorMessage,
  successMessage,
  csrfAccessToken,
  csrfRefreshToken,
  projects,
  teams,
  brackets,
  matches,
  topics,
  loadingBar: loadingBarReducer,
})
