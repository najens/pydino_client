import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/lib/fa'

const Score = ({ id, user, bracket, userScore, ppr, score, changeId }) => {
	if (!user) {
		return null
	}
	return (
		<div className='list-group-item d-flex justify-content-between score-container' to={`/world-cup-fantasy/bracket/${user.public_id}`}>
			<div className='d-flex align-items-center w-50'>
				{user.picture === ''
					? <FaUser className='gen-profile-pic mr-2' />
				: <img className='profile-pic mr-2' alt='profile' src={user.picture} />
				}
				<div className='mr-2'>{bracket.rank}</div>
				<div className='text-left'>{user.name}</div>
			</div>
			<div className='d-flex align-items-center w-50 justify-content-between'>
				<div>{bracket.score}</div>
				<div>{bracket.ppr}</div>
				<div>880</div>
			</div>
		</div>
	)
}

function mapStateToProps ({ users, brackets }, {id, changeId}) {
	const masterBracket = brackets[1]
	const bracket = brackets[id]
	const userId = Object.keys(users)
		.filter((a) => users[a].bracket === parseInt(id))
	const user = users[userId]

  return {
		user,
		bracket,
		changeId,
  }
}

export default connect(mapStateToProps)(Score)
