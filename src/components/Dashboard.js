import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import About from './Portfolio/About'
import Skills from './Portfolio/Skills'
import Portfolio from './Portfolio/Portfolio'
import Contact from './Portfolio/Contact'

const Dashboard = () => {
  return (
    <div>
			<Nav />
			<About />
			<Skills />
			<Portfolio />
			<Contact />
    </div>
  )
}

export default connect()(Dashboard)
