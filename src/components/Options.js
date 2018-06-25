import React, { Component, Fragment } from "react"
import { connect } from 'react-redux'
import { handleLogout } from '../actions/authedUser'
import { NavLink } from 'react-router-dom'
import { FaBars, FaTimesCircleO, FaAngleLeft } from 'react-icons/lib/fa'
import { clearSuccessMessage } from '../actions/successMessage'
import { clearErrorMessage } from '../actions/errorMessage'

class Options extends Component {
  state = {
    showOptions: false,
  }
  handleClick = () => {
    const { dispatch } = this.props
    dispatch(clearSuccessMessage())
    dispatch(clearErrorMessage())
    this.setState(prevState => ({
        showOptions: !prevState.showOptions
    }))
  }
  logout = () => {
    const { dispatch, authedUser } = this.props
    this.handleClick()
    dispatch(handleLogout(authedUser.id))
  }

  render () {
    const { authedUser, path } = this.props
    const { showOptions } = this.state

    const showAdminLinks = () => {
      if (authedUser.roles) {
        if (authedUser.roles.includes('admin')) {
          return (
            <Fragment>
              <div className='list-group-item bold black'>Admin</div>
              <NavLink
                className="list-group-item"
                to='/project/add' exact
                onClick={this.handleClick}
              >Add Project</NavLink>
              <NavLink
                className="list-group-item"
                to='/world-cup-fantasy/match/add' exact
                onClick={this.handleClick}
              >Add Match</NavLink>
            </Fragment>
          )
        }
      }
    }

    return (
      <div>
        <div className='d-flex'>
          {path
            ? <NavLink to={path} >
                <FaAngleLeft style={{'fontSize': '2.8rem'}} />
              </NavLink>
            : <a className='mn-nav-btn' onClick={this.handleClick}>
                <FaBars style={{'fontSize': '1.7rem'}}/>
              </a>
          }
        </div>
        {showOptions &&
          <div style={{
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'left': '0',
            'top': '4rem',
            'right': '0',
            'bottom': '0',
            'background': '#fff',
            'zIndex': '9',
          }}>
            <div className='d-flex flex-column'>
              <div className="w-100 option-group list-group list-group-flush">
                <NavLink className="list-group-item" to='/' onClick={this.handleClick} exact>Home</NavLink>
                <NavLink className='list-group-item' to='/world-cup-fantasy' onClick={this.handleClick} exact>World Cup Fantasy</NavLink>
                <div className='list-group-item bold black'>Account</div>
                {!authedUser.id &&
                  <Fragment>
                    <NavLink className="list-group-item" to='/login' onClick={this.handleClick} exact>Log in</NavLink>
                    <NavLink className="list-group-item" to='/signup' onClick={this.handleClick} exact>Sign up</NavLink>
                    <NavLink className="list-group-item" to='/password/forgot' onClick={this.handleClick} exact>Forgot password?</NavLink>
                  </Fragment>
                }
                {authedUser.id &&
                  <Fragment>
                    <NavLink className="list-group-item" to='/profile/edit' onClick={this.handleClick} exact>Edit Profile</NavLink>
                    <NavLink className="list-group-item" to='/password/change' onClick={this.handleClick} exact>Change Password</NavLink>
                    <NavLink className="list-group-item" to='/login' onClick={this.logout} exact>Log out</NavLink>
                  </Fragment>
                }
                {showAdminLinks()}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser }, { path }) => ({
    authedUser,
    path,
})

export default connect(mapStateToProps)(Options);
