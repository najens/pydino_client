import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import { isAdmin } from '../utils/helpers'
import LoadingBar from 'react-redux-loading'
import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import ConfirmEmail from './ConfirmEmail'
import Options from './Options'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'
import WCFDashboard from './WCFantasy/WCFDashboard'
import Bracket from './WCFantasy/Bracket'
import Leaderboard from './WCFantasy/Leaderboard'
import Standings from './WCFantasy/Standings'
import Matches from './WCFantasy/Matches'
import Dashboard from './Dashboard'
import ProjectPage from './Portfolio/ProjectPage'
import ProjectForm from './Portfolio/ProjectForm'
import DeleteProject from './Portfolio/DeleteProject'
import Email from './Portfolio/Email'
import NotFound from './NotFound'
import MatchForm from './WCFantasy/MatchForm'
import DeleteMatch from './WCFantasy/DeleteMatch'

/**
 * Main App component which handles component
 * routing and fetches initial data
 *
 * @return {jsx} routed components
 */
class App extends Component {
  // When component mounts fetch initial data
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { loading } = this.props
    // Return routed components
    return (
      <Router>
        <div className="App">
          <LoadingBar />
          <div>
            {// If loading initial data don't return components
              loading === true
                ? null
                : <Switch>
                    <Route path='/' exact component={Dashboard} />
                    {/** Account Routes */}
                    <Route path='/signup' component={Signup} />
                    <Route path='/login' component={Login} />
                    <Route
                      path='/profile/edit'
                      component={EditProfile}
                    />
                    <Route
                      path='/password/change'
                      component={ChangePassword}
                    />
                    <Route
                      path='/password/forgot'
                      component={ForgotPassword}
                    />
                    <Route
                      path='/password/reset'
                      component={ResetPassword}
                    />
                    <Route
                      path='/confirm/email'
                      component={ConfirmEmail}
                    />
                    {/** Portfolio Routes */}
                    <Route
                      path='/project/add' exact
                      component={ProjectForm}
                    />
                    <Route
                      path='/project/:id/edit'
                      component={ProjectForm}
                    />
                    <Route
                      path='/project/:id/delete'
                      component={DeleteProject}
                    />
                    <Route
                      path='/project/:id/:title'
                      component={ProjectPage}
                    />
                    <Route
                      path='/email' exact
                      component={Email}
                    />
                    {/** Fantasy WC App Routes */}
                    <Route path='/world-cup-fantasy' exact component={WCFDashboard} />
          		      <Route
          		        path='/world-cup-fantasy/standings'
          		        component={Standings}
          		      />
          		      <Route
          		        path='/world-cup-fantasy/matches'
          		        component={Matches}
          		      />
                    <Route
                      path='/world-cup-fantasy/leaderboard'
                      component={Leaderboard}
                    />
                    <Route
                      path='/world-cup-fantasy/bracket/:id'
                      component={Bracket}
                    />
                    <Route
                      path='/world-cup-fantasy/match/add' exact
                      component={MatchForm}
                    />
                    <Route
                      path='/world-cup-fantasy/match/:id/edit'
                      component={MatchForm}
                    />
                    <Route
                      path='/world-cup-fantasy/match/:id/delete'
                      component={DeleteMatch}
                    />
                    <Route path='*' component={NotFound} />
                  </Switch>
            }
          </div>
        </div>
      </Router>
    );
  }
}


/**
 * Get authedUser from redux store and return props
 *
 * @param {Object} authedUser
 * @return {Object}
 *    loading: {boolean}
 *    authedUser: {Object}
 */
function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser.id === null,
  }
}

export default connect(mapStateToProps)(App);
