import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavTabs from './NavTabs'
import Score from './Score'
import NotFound from '../NotFound'

class Leaderboard extends Component {
  render () {
    const { brackets, changeId, authedUser } = this.props
    if (!authedUser.id) {
      return <NotFound />
    }
	  return (
      <div>
        <NavTabs path='/' />
        <div className='container pg-margin'>
          <div className='d-flex score lb-tb-heading justify-content-between w-100'>
            <div className='d-flex'>
              <div className='lb-rk mr-2'>RK</div>
        			<div className='mr-2'>Name</div>
            </div>
      			<div className='d-flex w-50 justify-content-between'>
              <div>P</div>
              <div>PPR</div>
        			<div>PP</div>
            </div>
      		</div>
          {brackets.map((id) => (
            <Score key={id} id={id} changeId={changeId} />
          ))}
        </div>
      </div>

		)
  }
}

function mapStateToProps ({ brackets, authedUser }, {changeId}) {
  return {
    brackets: Object.keys(brackets).filter(a => brackets[a] !== brackets[1])
      .sort((a, b) => brackets[b].score - brackets[a].score),
    changeId,
    authedUser,
  }
}

export default connect(mapStateToProps)(Leaderboard)
