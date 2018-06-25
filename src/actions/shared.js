import { getInitialData } from '../utils/apis/shared'
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure
} from './users'
import { fetchProjectsRequest, fetchProjectsSuccess, fetchProjectsFailure
} from './projects'
import { fetchBracketsRequest, fetchBracketsSuccess, fetchBracketsFailure
} from './brackets'
import { fetchTeamsRequest, fetchTeamsSuccess, fetchTeamsFailure
} from './teams'
import { fetchMatchesRequest, fetchMatchesSuccess, fetchMatchesFailure
} from './matches'
import { fetchTopicsRequest, fetchTopicsSuccess, fetchTopicsFailure
} from './topics'
import { handleLoginToken } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { fetchRefreshTokenRequest, fetchRefreshTokenSuccess,
  fetchRefreshTokenFailure
} from './csrfRefreshToken'


/**
 * Handles initial data requests when app mounts
 * and dispatches actions based on server response.
 * Requests user's csrfRefreshToken if they haven't
 * deleted cookies, gets all users, and attempts to
 * login user if they have a refresh token.
 *
 */
export function handleInitialData () {
  return (dispatch, getState) => {
    dispatch(showLoading())
    dispatch(fetchRefreshTokenRequest())
    dispatch(fetchUsersRequest())
    dispatch(fetchTeamsRequest())
    dispatch(fetchBracketsRequest())
    dispatch(fetchMatchesRequest())
    dispatch(fetchProjectsRequest())
    dispatch(fetchTopicsRequest())

    return getInitialData().then(({ csrfRefreshToken, users, teams, brackets, Matches, projects, topics }) => {
      if (csrfRefreshToken.success) {
        dispatch(fetchRefreshTokenSuccess(csrfRefreshToken))
      }
      if (csrfRefreshToken.error) {
        dispatch(fetchRefreshTokenFailure(csrfRefreshToken))
      }
      if (users.success) {
        dispatch(fetchUsersSuccess(users))
      }
      if (users.error) {
        dispatch(fetchUsersFailure(users))
      }
      if (teams.success) {
        dispatch(fetchTeamsSuccess(teams))
      }
      if (teams.error) {
        dispatch(fetchTeamsFailure(teams))
      }
      if (brackets.success) {
        dispatch(fetchBracketsSuccess(brackets))
      }
      if (brackets.error) {
        dispatch(fetchBracketsFailure(brackets))
      }
      if (Matches.success) {
        dispatch(fetchMatchesSuccess(Matches))
      }
      if (Matches.error) {
        dispatch(fetchMatchesFailure(Matches))
      }
      if (projects.success) {
        dispatch(fetchProjectsSuccess(projects))
      }
      if (projects.error) {
        dispatch(fetchProjectsFailure(projects))
      }
      if (topics.success) {
        dispatch(fetchTopicsSuccess(topics))
      }
      if (topics.error) {
        dispatch(fetchTopicsFailure(topics))
      }
      dispatch(hideLoading())
    }).then(() => dispatch(handleLoginToken()))
  }
}
