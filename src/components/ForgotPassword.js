import React, { Component } from "react"
import { connect } from 'react-redux'
import { handleForgotPassword } from '../actions/authedUser'
import LoadingSpinner from './LoadingSpinner'
import FetchError from './FetchError'
import FetchSuccess from './FetchSuccess'
import Nav from './Nav'


class ForgotPassword extends Component {
    state = {
      username: '',
    }
    handleUsernameChange = (e) => {
      const username = e.target.value

      this.setState(() => ({
        username,
      }))
    }
    handleSubmit = (e) => {
      e.preventDefault()

      const { username } = this.state
      const { dispatch } = this.props

      dispatch(handleForgotPassword(username))
          .then(() => {
              const { errorMessage } = this.props
              if (!errorMessage) {
                  this.setState(() => ({
                      username: '',
                  }))
              }
          })
    }

    render () {
        const { username } = this.state
        const { isFetching, errorMessage, successMessage } = this.props

        return (
          <div>
            <Nav />
            <div className="container pg-margin">
                <h2 className='text-center pt-5 pb-3'>Reset Password</h2>
                <form onSubmit={this.handleSubmit}>
                  <div className='form-group'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Username or Email'
                        autoComplete='email'
                        value={username}
                        onChange={this.handleUsernameChange}
                      />
                  </div>
                  <div className='loading-btn-container'>
                      <button
                        className='w-100 btn btn-primary btn-fixed'
                        type="submit"
                        disabled={ username === ''}
                      >
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

export default connect(mapStateToProps)(ForgotPassword);
