import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddMatch, handleEditMatch } from '../../actions/matches'
import FetchError from '../FetchError'
import FetchSuccess from '../FetchSuccess'
import { Redirect } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner'
import Nav from '../Nav'
import NotFound from '../NotFound'
import { isAdmin } from '../../utils/helpers'

class MatchForm extends Component {
  state = {
		toMatches: false,
		Match: {},
		id: '',
		game: '',
		team1_id: '',
		team2_id: '',
		date: '',
		round: '',
		title: '',
		team1_score: '',
		team2_score: '',
		gameChanged: false,
		team1IdChanged: false,
		team2IdChanged: false,
		dateChanged: false,
		roundChanged: false,
		titleChanged: false,
		team1ScoreChanged: false,
		team2ScoreChanged: false,
  }

	// Use new static method to derive state from props
  static getDerivedStateFromProps(nextProps, prevState) {
		// If the props have changed, set new state
  	if(nextProps.Match !== prevState.Match) {
      const Match = nextProps.Match
			console.log(Match)
      if (!Match) {
        return null
      }
    	return {
				Match,
				id: Match.id,
				game: Match.match,
				team1_id: Match.team1,
				team2_id: Match.team2,
				date: Match.date,
				round: Match.round,
				title: Match.title,
				team1_score: Match.team1_score,
				team2_score: Match.team2_score,
     	}
    }
   	// Otherwise do not update state
    return null;
  }

  handleGameChange = (e) => {
    const game = e.target.value

    this.setState(() => ({
      game,
			gameChanged: true,
    }))
  }
  handleTeam1IdChange = (e) => {
    const team1_id = e.target.value

    this.setState(() => ({
      team1_id,
			team1IdChanged: true,
    }))
  }
  handleTeam2IdChange = (e) => {
    const team2_id = e.target.value

    this.setState(() => ({
      team2_id,
			team2IdChanged: true,
    }))
  }
	handleDateChange = (e) => {
    const date = e.target.value

    this.setState(() => ({
      date,
			dateChanged: true,
    }))
  }
  handleRoundChange = (e) => {
    const round = e.target.value

    this.setState(() => ({
      round,
			roundChanged: true,
    }))
  }
	handleTitleChange = (e) => {
    const title = e.target.value

    this.setState(() => ({
      title,
			titleChanged: true,
    }))
  }
	handleTeam1ScoreChange = (e) => {
    const team1_score = e.target.value

    this.setState(() => ({
      team1_score,
			team1ScoreChanged: true,
    }))
  }
	handleTeam2ScoreChange = (e) => {
    const team2_score = e.target.value

    this.setState(() => ({
      team2_score,
			team2ScoreChanged: true,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { id, game, team1_id, team2_id, date, round, title, team1_score,
			team2_score, gameChanged, team1IdChanged, team2IdChanged,
			dateChanged, roundChanged, titleChanged, team1ScoreChanged,
			team2ScoreChanged
		} = this.state
    const { dispatch, type } = this.props

		const Match = {}
		if (gameChanged) {
			Match.Match = game
		}
		if (team1IdChanged) {
			Match.team1_id = team1_id
		}
		if (team2IdChanged) {
			Match.team2_id = team2_id
		}
		if (dateChanged) {
			Match.date = date
		}
		if (roundChanged) {
			Match.round = round
		}
		if (titleChanged) {
			Match.title = title
		}
		if (team1ScoreChanged) {
			Match.team1_score = team1_score
		}
		if (team2ScoreChanged) {
			Match.team2_score = team2_score
		}

		if (type === 'add') {
			return dispatch(handleAddMatch(Match)).then(() => {
        const { errorMessage } = this.props
        if (!errorMessage) {
          this.setState(() => ({
            game: '',
            team1_id: '',
            team2_id: '',
            date: '',
						round: '',
						title: '',
						team1_score: '',
						team2_score: '',
          }))
        }
	    })
		}
		Match.id = id
		return dispatch(handleEditMatch(Match)).then(() => {
      const { errorMessage } = this.props
      if (!errorMessage) {
        this.setState(() => ({
          toMatches: true,
        }))
      }
    })
  }

  render () {
		const { toMatches, game, team1_id, team2_id, date, round, title, team1_score,
			team2_score
		} = this.state
    const { successMessage, errorMessage, authedUser, isFetching,
			type
		} = this.props
		console.log(authedUser)

		if (!isAdmin(authedUser)) {
			return <NotFound />
		}

		if (toMatches) {
			return <Redirect to='/world-cup-fantasy/matches' />
		}

    return (
      <div>
        <Nav path='/world-cup-fantasy/matches' />
        <div className='container pg-margin'>
          <h2 className='text-center pt-5 pb-3'>
						{type === 'add' ? 'Add Match' : 'Edit Match'}
					</h2>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
                <input
									required autoFocus
                  type='text'
                  className='form-control'
                  placeholder='Match'
                  autoComplete='off'
                  value={game}
                  onChange={this.handleGameChange} />
            </div>
            <div className='form-group'>
                <input
                  required
									type='text'
                  className='form-control'
                  placeholder='Team 1 ID'
									autoComplete='off'
                  value={team1_id}
                  onChange={this.handleTeam1IdChange}
                />
            </div>
            <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Team 2 ID'
                  autoComplete='off'
                  value={team2_id}
                  onChange={this.handleTeam2IdChange}
                />
            </div>
						<div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Date'
                  autoComplete='off'
                  value={date}
                  onChange={this.handleDateChange}
                />
            </div>
						<div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Round'
                  autoComplete='off'
                  value={round}
                  onChange={this.handleRoundChange}
                />
            </div>
						<div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Title'
                  autoComplete='off'
                  value={title}
                  onChange={this.handleTitleChange}
                />
            </div>
						<div className='form-group'>
              <textarea
                className='form-control'
                placeholder='Team 1 Score'
								autoComplete='off'
                value={team1_score}
                onChange={this.handleTeam1ScoreChange}
              />
            </div>
						<div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Team 2 Score'
                autoComplete='off'
                value={team2_score}
                onChange={this.handleTeam2ScoreChange}
              />
            </div>
            <div className='loading-btn-container'>
                <button
									type="submit"
									className='w-100 btn btn-primary btn-fixed'
									disabled={(game === '' || team1_id === '' ||
										team2_id === '' || date === '' || round === '' ||
										title === '')}
								>Submit</button>
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
	successMessage, matches
}, props) {
	let type
	let Match
	if (props.match.path === '/world-cup-fantasy/match/add') {
		type = 'add'
	} else {
		type = 'edit'
		const { id } = props.match.params
		Match = matches[id]
	}
  return {
    errorMessage,
    authedUser,
    isFetching,
    successMessage,
		type,
		Match,
  }
}

export default connect(mapStateToProps)(MatchForm)
