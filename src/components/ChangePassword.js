import React, { Component } from "react"
import { connect } from 'react-redux'
import { handleChangePassword } from '../actions/users'
import LoadingSpinner from './LoadingSpinner'
import FetchError from './FetchError'
import FetchSuccess from './FetchSuccess'
import Nav from './Nav'
import NotFound from './NotFound'

/**
 * Dashboard component which renders
 * the main page of the app
 *
 * @return {jsx} routed components
 */
class ChangePassword extends Component {
    state = {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    }
    handleOldPasswordChange = (e) => {
      const oldPassword = e.target.value

      this.setState(() => ({
        oldPassword,
      }))
    }
    handlePasswordChange = (e) => {
      const password = e.target.value

      this.setState(() => ({
        password,
      }))
    }
    handleConfirmPasswordChange = (e) => {
      const confirmPassword = e.target.value

      this.setState(() => ({
        confirmPassword,
      }))
    }
    handleSubmit = (e) => {
      e.preventDefault()

      const { oldPassword, password, confirmPassword } = this.state
      const { dispatch, authedUser } = this.props

      if (oldPassword === '' || password === '' || confirmPassword === '') {
          return
      }


      if (password === confirmPassword) {
          const credentials = {
              public_id: authedUser.id,
              oldPassword,
              password,
          }
          console.log(credentials)

          dispatch(handleChangePassword(credentials))
              .then(() => {
                  const { errorMessage } = this.props
                  if (!errorMessage) {
                      this.setState(() => ({
                          oldPassword: '',
                          password: '',
                          confirmPassword: '',
                      }))
                  }
              })
      }
    }

    render () {
        const { oldPassword, password, confirmPassword } = this.state
        const { isFetching, errorMessage, successMessage, authedUser } = this.props

        if (!authedUser.id) {
          return <NotFound />
        }

        return (
          <div>
            <Nav path='/' />
            <div className="container pg-margin">
                <h2 className='text-center pt-5 pb-3'>Change Password</h2>
                <form onSubmit={this.handleSubmit}>
                  <div className='form-group'>
                      <input
                        type='password'
                        className='form-control'
                        placeholder='Old Password'
                        autoComplete='current-password'
                        value={oldPassword}
                        onChange={this.handleOldPasswordChange}
                      />
                  </div>
                  <div className='form-group'>
                      <input
                        type='password'
                        className='form-control'
                        placeholder='Password'
                        value={password}
                        onChange={this.handlePasswordChange}
                      />
                  </div>
                  <div className='form-group'>
                      <input
                        type='password'
                        className='form-control'
                        placeholder='Confirm Password'
                        autoComplete='new-password'
                        value={confirmPassword}
                        onChange={this.handleConfirmPasswordChange}
                      />
                  </div>
                  <div className='loading-btn-container'>
                      <button
                        className='w-100 btn btn-primary btn-fixed'
                        type="submit"
                        disabled={ password === '' || confirmPassword === ''}>
                          Reset
                      </button>
                      {isFetching && <LoadingSpinner />}
                  </div>
                  <div className='d-flex flex-column align-items-center'>
                      {successMessage && <FetchSuccess message={successMessage} />}
                      {errorMessage && <FetchError message={errorMessage} />}
                  </div>
                </form>
            </div>
          </div>
        )
    }
}


const mapStateToProps = ({ isFetching, errorMessage, successMessage, authedUser }) => ({
    isFetching,
    errorMessage,
    successMessage,
    authedUser,
})

export default connect(mapStateToProps)(ChangePassword);
