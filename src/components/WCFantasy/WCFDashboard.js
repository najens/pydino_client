import React from 'react'
import { connect } from 'react-redux'
import Bracket from './Bracket'

const WCFDashboard = ({authedUser}) => {
  return (
    <div>
      <Bracket id={authedUser.id} />
    </div>
  )
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(WCFDashboard)
