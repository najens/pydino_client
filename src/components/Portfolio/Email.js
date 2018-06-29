import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSendEmail } from '../../actions/contact'
import LoadingSpinner from '../LoadingSpinner'
import FetchSuccess from '../FetchSuccess'
import FetchError from '../FetchError'
import Nav from '../Nav'

class Email extends Component {
  state = {
    formValues: {
      subject: '',
      message: ''
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    const { formValues } = this.state
    let name = e.target.name;
    let value = e.target.value;

    formValues[name] = value;

    this.setState({formValues})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { formValues } = this.state
    const { handleSendEmail } = this.props
    if (formValues.subject === '' || formValues.message === '') {
      return
    }
    const contact = {
      subject: formValues.subject,
      message: formValues.message,
    }
    handleSendEmail(contact).then(() => {
      const { errorMessage } = this.props
      if (!errorMessage) {
        this.setState(() => ({
          formValues: {
            subject: '',
            message: '',
          }
        }))
      }
    })
  }
  // <form action="https://mailthis.to/kanimambo" method="POST" encType="mulitpart/form-data" className="full-width" id="contact-form">

  render() {
    const { formValues } = this.state
    const { isFetching, successMessage, errorMessage } = this.props
    return (
      <div id="contact">
				<Nav path='/' />
	      <div className='container pg-margin'>
          <header>
            <h3 className='bold'>Send Email</h3>
            <div className='header-bar'></div>
          </header>
          <div className='flex-row full-width'>
            <form onSubmit={this.handleSubmit} className='full-width'>
              <div className='form-group'>
                <label htmlFor='input-name'>Subject</label>
                <input
                  type='text' required
                  className='form-control'
                  placeholder='Subject'
                  name='subject'
                  value={formValues.subject}
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='input-message'>Message</label>
                <textarea
                  type='text' required
                  className='form-control'
                  rows='6'
                  placeholder='Your message'
                  name='message'
                  value={formValues.message}
                  onChange={this.handleChange}
                />
              </div>
              <div className='loading-btn-container'>
                <button
                  type="submit"
                  className='w-100 btn btn-primary btn-fixed'
                  disabled={(
                    formValues.name === '' || formValues.email === '' ||
                    formValues.message === ''
                  )}>
                    Submit
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
      </div>
    )
  }
}

function mapStateToProps({ isFetching, successMessage, errorMessage}) {
  return {
    isFetching,
    successMessage,
    errorMessage,
  }
}

export default connect(
  mapStateToProps,
  {handleSendEmail: handleSendEmail}
)(Email)
