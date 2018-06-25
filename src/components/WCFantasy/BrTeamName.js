import React from 'react'
import { connect } from 'react-redux'

const BrTeamName = ({ id, name }) => {
	return (
		<div className='d-flex team align-items-center justify-content-center'>
			{name}
		</div>
	)
}

function mapStateToProps ({ teams }, {id}) {
	let name
  if (id) {
		name = teams[id].name
	}
  return {
    name,
  }
}

export default connect(mapStateToProps)(BrTeamName)
