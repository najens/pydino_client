import React, { Component } from 'react'
import { connect } from 'react-redux'

/**
 * Dashboard component which renders
 * the main page of the app
 *
 * @return {jsx} routed components
 */
class Dashboard extends Component {
  render() {

    return (
      <div className='bottom-nav'>

      </div>
    );
  }
}


export default connect()(Dashboard);
