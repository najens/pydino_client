import { getUsers } from './users'
import { getCSRFRefreshToken } from './login'
import { getProjects } from './projects'
import { getTeams } from './teams'
import { getBrackets } from './brackets'
import { getMatches } from './matches'
import { getTopics } from './topics'
import fb_login from './fb_login'
import go_login from './go_login'

export function getInitialData () {
  return Promise.all([
    getCSRFRefreshToken(),
    getUsers(),
    getTeams(),
    getBrackets(),
    getMatches(),
    getProjects(),
    getTopics(),
    fb_login(), // Get the facebook sdk
    go_login(), // Get the google sdk
  ]).then(
    ([csrfRefreshToken, users, teams, brackets, Matches, projects, topics]) => ({
      csrfRefreshToken,
      users,
      teams,
      brackets,
      Matches,
      projects,
      topics,
    })
  )
}
