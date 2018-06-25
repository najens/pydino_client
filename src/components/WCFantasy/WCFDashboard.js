import React, { Component } from 'react'
import { connect } from 'react-redux'
import Bracket from './Bracket'

const WCFDashboard = ({authedUser}) => {
  console.log(authedUser.id)
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
