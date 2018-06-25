import React, { Component } from "react"
import { connect } from 'react-redux'
import { handleResetPassword } from '../actions/users'
import LoadingSpinner from './LoadingSpinner'
import FetchError from './FetchError'
import FetchSuccess from './FetchSuccess'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'


class ResetPassword extends Component {
    state = {
      password: '',
      confirmPassword: '',
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

      const { password, confirmPassword } = this.state
      const { dispatch } = this.props
      const url = new URL(window.location.href)
      const params = new URLSearchParams(url.search);
      const token = params.get('token')
      const public_id = params.get('public_id')
      // const csrf_access_token = params.get('csrf')

      if (token && password === confirmPassword) {
          const credentials = {
              token,
              public_id,
              // csrf_access_token,
              password,
          }
          dispatch(handleResetPassword(credentials))
              .then(() => {
                  const { errorMessage } = this.props
                  if (!errorMessage) {
                      this.setState(() => ({
                          password: '',
                          confirmPassword: '',
                      }))
                  }
              })
      }
    }

    render () {
        const { password, confirmPassword } = this.state
        const { isFetching, errorMessage, successMessage } = this.props

        if (successMessage) {
            return <Redirect to='/login' />
        }

        return (
          <div>
            <Nav />
            <div className="container pg-margin">
                <h2 className='text-center pt-5 pb-3'>Reset Password</h2>
                <form onSubmit={this.handleSubmit}>
                  <div className='form-group'>
                      <input type='password' className='form-control' placeholder='Password' value={password} onChange={this.handlePasswordChange} />
                  </div>
                  <div className='form-group'>
                      <input type='password' className='form-control' placeholder='Confirm Password' value={confirmPassword} onChange={this.handleConfirmPasswordChange} />
                  </div>
                  <div className='loading-btn-container'>
                      <button className='w-100 btn btn-primary btn-fixed' type="submit" disabled={ password === '' || confirmPassword === ''}>
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

const mapStateToProps = ({ isFetching, errorMessage, successMessage }) => ({
    isFetching,
    errorMessage,
    successMessage,
})

export default connect(mapStateToProps)(ResetPassword);
