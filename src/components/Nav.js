import React, { Component } from 'react'
import { connect } from 'react-redux'
import Options from './Options'
import pydino from '../img/pydino-fantasy-sm.png'

const Nav = ({ path }) => {
	return (
			<div className='nav d-flex align-items-center mn-header'>
				<Options path={path} />
				<div>
					<img className='mn-logo' src={pydino} />
				</div>
				<div className='title'>PyDino</div>
			</div>
	)
}

export default connect()(Nav)
