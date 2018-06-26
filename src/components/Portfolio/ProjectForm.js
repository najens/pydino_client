import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddProject, handleEditProject } from '../../actions/projects'
import { handleLoginOAuth } from '../../actions/authedUser'
import FetchError from '../FetchError'
import FetchSuccess from '../FetchSuccess'
import { Redirect } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner'
import { FaGoogle, FaFacebookSquare } from 'react-icons/lib/fa'
import Nav from '../Nav'
import NotFound from '../NotFound'
import { createUrlTitle, isAdmin } from '../../utils/helpers'

class ProjectForm extends Component {
  state = {
		toProject: '',
		project: {},
		id: '',
    title: '',
		description: '',
		img_url: '',
		alt: '',
		site_url: '',
		github_url: '',
		read_me: '',
		topic_main: '',
		topics: [],
		titleChanged: false,
		descriptionChanged: false,
		img_urlChanged: false,
		altChanged: false,
		site_urlChanged: false,
		github_urlChanged: false,
		read_meChanged: false,
		topic_mainChanged: false,
		topicsChanged: false,
  }

	// Use new static method to derive state from props
  static getDerivedStateFromProps(nextProps, prevState) {
		// If the props have changed, set new state
  	if(nextProps.project !== prevState.project) {
      const project = nextProps.project
      if (!project) {
        return null
      }
			let topics = []
			if (project.topics) {
				project.topics.map((topic) => (
					topics.push(topic.id)
				))
			}
    	return {
				project: nextProps.project,
				id: project.id,
				title: project.title,
				description: project.description,
        img_url: project.img_url,
        alt: project.alt,
        site_url: project.site_url,
				github_url: project.github_url,
				read_me: project.read_me,
				topic_main: project.topic_main,
				topics,
     	}
    }
   	// Otherwise do not update state
    return null;
  }

  handleTitleChange = (e) => {
    const title = e.target.value

    this.setState(() => ({
      title,
			titleChanged: true,
    }))
  }
  handleDescriptionChange = (e) => {
    const description = e.target.value

    this.setState(() => ({
      description,
			descriptionChanged: true,
    }))
  }
  handleImgUrlChange = (e) => {
    const img_url = e.target.value

    this.setState(() => ({
      img_url,
			img_urlChanged: true,
    }))
  }
	handleAltChange = (e) => {
    const alt = e.target.value

    this.setState(() => ({
      alt,
			altChanged: true,
    }))
  }
  handleSiteUrlChange = (e) => {
    const site_url = e.target.value

    this.setState(() => ({
      site_url,
			site_urlChanged: true,
    }))
  }
	handleGitHubUrlChange = (e) => {
    const github_url = e.target.value

    this.setState(() => ({
      github_url,
			github_urlChanged: true,
    }))
  }
	handleReadMeChange = (e) => {
    const read_me = e.target.value

    this.setState(() => ({
      read_me,
			read_meChanged: true,
    }))
  }
	handleTopicMainChange = (e) => {
    const topic_main = e.target.value

    this.setState(() => ({
      topic_main,
			topic_mainChanged: true,
    }))
  }
	// TODO: Add handle topicsChange
	handleTopicsChange = (e) => {
		const { topicArray } = this.props
		// TODO: Set topics state
		const topics = []
		topicArray.map((topic) => {
			const element = document.getElementById(`topic-check-${topic.id}`)
			if(element.checked === true) {
				topics.push(topic.id)
			}
		})
		this.setState(() => ({
			topics,
			topicsChanged: true,
		}))

	}

	isChecked = (id) => {
		const { topics } = this.state
		let checked = false
		topics.map((topicId) => {
			if (topicId === id) {
				checked = true
			}
		})
		return checked
	}

	createCheckBox = (topic) => {
		return React.createElement('input', {
			id: `topic-check-${topic.id}`,
			type: 'checkbox',
			value: topic.name,
			onChange: this.handleTopicsChange,
			defaultChecked: this.isChecked(topic.id)
		})
	}

  handleSubmit = (e) => {
    e.preventDefault()

    const { id, title, description, site_url, img_url, alt, github_url,
			read_me, topic_main, topics, titleChanged, descriptionChanged,
			site_urlChanged, img_urlChanged, altChanged, github_urlChanged,
			read_meChanged, topic_mainChanged, topicsChanged
		} = this.state
    const { dispatch, type } = this.props

		const project = {}
		if (titleChanged) {
			project.title = title
		}
		if (descriptionChanged) {
			project.description = description
		}
		if (site_urlChanged) {
			project.site_url = site_url
		}
		if (img_urlChanged) {
			project.img_url = img_url
		}
		if (altChanged) {
			project.alt = alt
		}
		if (github_urlChanged) {
			project.github_url = github_url
		}
		if (read_meChanged) {
			project.read_me = read_me
		}
		if (topic_mainChanged) {
			project.topic_main = topic_main
		}
		if (topicsChanged) {
			project.topics = topics
		}

		if (type === 'add') {
			return dispatch(handleAddProject(project)).then(() => {
        const { errorMessage } = this.props
        if (!errorMessage) {
          this.setState(() => ({
            title: '',
            description: '',
            site_url: '',
            img_url: '',
						alt: '',
						github_url: '',
						read_me: '',
						topic_main: '',
          }))
        }
	    })
		}
		project.id = id
		return dispatch(handleEditProject(project)).then(() => {
      const { errorMessage } = this.props
      if (!errorMessage) {
        this.setState(() => ({
          toProject: id,
        }))
      }
    })
  }

  render () {
		const { title, description, site_url, img_url, alt, github_url,
			read_me, topic_main, toProject, topics, project
		} = this.state
    const { successMessage, errorMessage, authedUser, isFetching, topicArray,
			type
		} = this.props
    let url_title

    if (!isAdmin(authedUser)) {
      return <NotFound />
    }

    if (type === 'edit') {
      url_title = createUrlTitle(project.title)
    }

		if (toProject !== '') {
      if ( type === 'add' ) {
        return <Redirect to='/' />
      }
			return <Redirect to={`/project/${toProject}/${url_title}`} />
		}

    return (
      <div>
        <Nav path={type === 'add' ? '/' : `/project/${project.id}/${url_title}`}/>
        <div className='container pg-margin'>
          <h2 className='text-center pt-5 pb-3'>
						{type === 'add' ? 'Add Project' : 'Edit Project'}
					</h2>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
                <input
									required autoFocus
                  type='text'
                  className='form-control'
                  placeholder='Title'
                  autoComplete='off'
                  value={title}
                  onChange={this.handleTitleChange} />
            </div>
            <div className='form-group'>
                <textarea
                  required
                  className='form-control'
                  placeholder='Description'
                  value={description}
                  autoComplete='off'
									rows='3'
									wrap='soft'
                  onChange={this.handleDescriptionChange}
                />
            </div>
            <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Site Url'
                  autoComplete='off'
                  value={site_url}
                  onChange={this.handleSiteUrlChange}
                />
            </div>
						<div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Img Url'
                  autoComplete='off'
                  value={img_url}
                  onChange={this.handleImgUrlChange}
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
						<div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='GitHub Url'
                  autoComplete='off'
                  value={github_url}
                  onChange={this.handleGitHubUrlChange}
                />
            </div>
						<div className='form-group'>
              <textarea
                className='form-control'
                placeholder='Read Me HTML'
                value={read_me}
                autoComplete='off'
								rows='20'
								wrap='soft'
                onChange={this.handleReadMeChange}
              />
            </div>
						<div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Main Topic'
                autoComplete='off'
                value={topic_main}
                onChange={this.handleTopicMainChange}
              />
            </div>
						<div className='d-flex flex-wrap'>
							{topicArray.map((topic) => (
								<div key={topic.id} className='form-group'>
									<div className='d-flex align-items-center'>
										{this.createCheckBox(topic)}
										<span className='mr-2'>{topic.name}</span>
									</div>
								</div>
							))}
						</div>
            <div className='loading-btn-container'>
                <button
									type="submit"
									className='w-100 btn btn-primary btn-fixed'
									disabled={title === '' || description === ''}
								>Submit</button>
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

function mapStateToProps ({ errorMessage, authedUser, isFetching,
	successMessage, topics, projects
}, props) {
	let type
	let project
	if (props.match.path === '/project/add') {
		type = 'add'
	} else {
		type = 'edit'
		const { id } = props.match.params
		project = projects[id]
	}
	const topicIds = Object.keys(topics)
	const topicArray = []
	topicIds.map((id, index) => (
		topicArray.push(topics[id])
	))
  return {
    errorMessage,
    authedUser,
    isFetching,
    successMessage,
		topicArray,
		type,
		project,
  }
}

export default connect(mapStateToProps)(ProjectForm)
