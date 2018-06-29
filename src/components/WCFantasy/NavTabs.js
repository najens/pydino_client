import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Options from '../Options'
import pydino from '../../img/pydino-fantasy-sm.png'

const NavTabs = ({public_id, authedUser, path}) => {
	return (
			<ul className='nav d-flex align-items-center mn-header'>
				<Options path={path} />
				<li>
					<img className='mn-logo' src={pydino} />
				</li>
				<li id='wc-title'>
					<div className='title'>World Cup Fantasy</div>
				</li>
				<li className='nav-item'>
					<Link
						className='nav-link'
						to='/world-cup-fantasy'
						id={public_id}
					>Bracket</Link>
				</li>
				{authedUser.id &&
					<li className='nav-item'>
						<Link
							className='nav-link'
							to='/world-cup-fantasy/leaderboard'
						>Leaderboard</Link>
					</li>
				}
				<li className='nav-item'>
					<Link
						className='nav-link'
						to='/world-cup-fantasy/matches'
					>Matches</Link>
				</li>
				<li className='nav-item'>
					<Link
						className='nav-link'
						to='/world-cup-fantasy/standings'
					>Standings</Link>
				</li>
			</ul>
	)
}

function mapStateToProps ({ users, authedUser }, {path}) {
	let public_id
	if (authedUser.id) {
		const user = users[authedUser.id]
		public_id = user.public_id
	}
  return {
    public_id,
    authedUser,
		path,
  }
}

export default connect(mapStateToProps)(NavTabs)
