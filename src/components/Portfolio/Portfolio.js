import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectList from './ProjectList'
import { Redirect } from 'react-router-dom'

class Portfolio extends Component {

  render() {
    return (
      <div id="portfolio" className='pg-margin'>
        <div className="container flex-col w-10">
          <header>
            <h3 className='bold'>Projects</h3>
            <div className='header-bar'></div>
          </header>
          <div className="flex-row">
            <ProjectList />
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Portfolio)
