import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleDeleteProject } from '../../actions/projects'
import FetchError from '../FetchError'
import FetchSuccess from '../FetchSuccess'
import { Redirect } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner'
import Nav from '../Nav'
import NotFound from '../NotFound'
import { createUrlTitle, isAdmin } from '../../utils/helpers'

class DeleteProject extends Component {
	state = {
		toHome: 'false'
	}

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, project } = this.props
		dispatch(handleDeleteProject(project.id)).then(
			this.setState({
				toHome: true
			})
		)
  }

  render () {
    const { successMessage, errorMessage, authedUser, isFetching, project
		} = this.props
		const { toHome } = this.state

		if (!project) {
			return null
		}

		if (!isAdmin(authedUser)) {
			return <NotFound />
		}

		const url_title = createUrlTitle(project.title)

		if (toHome === true) {
			return <Redirect to='/' />
		}

    return (
      <div>
        <Nav path={`/project/${project.id}/${url_title}`} />
        <div className='container pg-margin'>
          <h2 className='text-center pt-5 pb-3'>
						{`Are you sure you want to delete ${project.title}?`}
					</h2>
          <form onSubmit={this.handleSubmit}>
            <div className='loading-btn-container'>
                <button
									type="submit"
									className='w-100 btn btn-primary btn-fixed'
								>Delete</button>
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
	successMessage, projects
}, props) {
	const { id } = props.match.params
	const project = projects[id]

  return {
    errorMessage,
    authedUser,
    isFetching,
    successMessage,
		project,
  }
}

export default connect(mapStateToProps)(DeleteProject)
