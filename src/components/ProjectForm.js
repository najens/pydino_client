import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddProject } from '../actions/projects'
import FetchError from './FetchError'
import FetchSuccess from './FetchSuccess'
import LoadingSpinner from './LoadingSpinner'

class ProjectForm extends Component {
  state = {
    title: '',
    description: '',
    img_url: '',
    site_url: '',
    github_url: '',
    alt: '',
  }

  handleTitleChange = (e) => {
    const title = e.target.value

    this.setState(() => ({
      title,
    }))
  }
  handleDescriptionChange = (e) => {
    const description = e.target.value

    this.setState(() => ({
      description,
    }))
  }
  handleImageUrlChange = (e) => {
    const img_url = e.target.value

    this.setState(() => ({
      img_url,
    }))
  }
  handleSiteUrlChange = (e) => {
    const site_url = e.target.value

    this.setState(() => ({
      site_url,
    }))
  }
	handleGithubUrlChange = (e) => {
    const github_url = e.target.value

    this.setState(() => ({
      github_url,
    }))
  }
  handleAltChange = (e) => {
    const alt = e.target.value

    this.setState(() => ({
      alt,
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { title, description, img_url, site_url, github_url, alt
		} = this.state
    const { dispatch } = this.props

    dispatch(handleAddProject({
			title,
			description,
			img_url,
			site_url,
			github_url,
			alt,
    })).then(() => {
      const { errorMessage } = this.props
      if (!errorMessage) {
        this.setState(() => ({
          title: '',
          description: '',
          img_url: '',
          site_url: '',
          github_url: '',
          alt: '',
        }))
      }
    })
  }

  render () {
    const { title, description, img_url, site_url, github_url, alt
		} = this.state
    const { successMessage, errorMessage, isFetching
		} = this.props

    return (
      <div className='container'>
        <h2 className='text-center pt-5 pb-3'>Add Project</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Title'
                autoComplete='off'
                value={title}
                onChange={this.handleTitleChange} />
          </div>
          <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Description'
                value={description}
                autoComplete='off'
                onChange={this.handleDescriptionChange}
              />
          </div>
          <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Image URL'
                autoComplete='off'
                value={img_url}
                onChange={this.handleImageUrlChange}
              />
          </div>
          <div className='form-group'>
              <input
                type='url'
                className='form-control'
                placeholder='Site URL'
                autoComplete='off'
                value={site_url}
                onChange={this.handleSiteUrlChange}
              />
          </div>
					<div className='form-group'>
              <input
                type='url'
                className='form-control'
                placeholder='Github URL'
                autoComplete='off'
                value={github_url}
                onChange={this.handleGithubUrlChange}
              />
          </div>
					<div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Alt'
                autoComplete='off'
                value={alt}
                onChange={this.handleAltChange}
              />
          </div>
          <div className='loading-btn-container'>
              <button type="submit"
								className='w-100 btn btn-primary btn-fixed'
								disabled={title === '' || description === ''}>
                  Sign up
              </button>
              {isFetching && <LoadingSpinner />}
          </div>
          <div className='d-flex flex-column align-items-center'>
              {successMessage && <FetchSuccess message={successMessage} />}
              {errorMessage && <FetchError message={errorMessage} />}
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ errorMessage, authedUser, isFetching, successMessage }) {

  return {
    errorMessage,
    authedUser,
    isFetching,
    successMessage,
  }
}

export default connect(mapStateToProps)(ProjectForm)
