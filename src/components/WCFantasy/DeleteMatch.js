import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleDeleteMatch } from '../../actions/matches'
import FetchError from '../FetchError'
import FetchSuccess from '../FetchSuccess'
import { Redirect } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner'
import Nav from '../Nav'
import NotFound from '../NotFound'
import { isAdmin } from '../../utils/helpers'

class DeleteMatch extends Component {
	state = {
		toMatches: 'false'
	}

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, Match } = this.props
		dispatch(handleDeleteMatch(Match.id)).then(
			this.setState({
				toMatches: true
			})
		)
  }

  render () {
    const { successMessage, errorMessage, authedUser, isFetching, Match
		} = this.props
		const { toMatches } = this.state

		if (!Match) {
			return null
		}

		if (!isAdmin(authedUser)) {
			return <NotFound />
		}

		if (toMatches === true) {
			return <Redirect to='/world-cup-fantasy/matches' />
		}

    return (
      <div>
        <Nav path='/world-cup-fantasy/matches' />
        <div className='container pg-margin'>
          <h2 className='text-center pt-5 pb-3'>
						{`Are you sure you want to delete ${Match.Match}?`}
					</h2>
          <form onSubmit={this.handleSubmit}>
            <div className='loading-btn-container'>
                <button
									type="submit"
									className='w-100 btn btn-primary btn-fixed'
								>Delete</button>
                {isFetching && <LoadingSpinner />}
            </div>
            <div className='d-flex flex-column align-items-center'>
                {successMessage && <FetchSuccess message={successMessage} />}
                {errorMessage && <FetchError message={errorMessage} />}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ errorMessage, authedUser, isFetching,
	successMessage, Matches
}, props) {
	const { id } = props.match.params
	const Match = Matches[id]

  return {
    errorMessage,
    authedUser,
    isFetching,
    successMessage,
		Match,
  }
}

export default connect(mapStateToProps)(DeleteMatch)
