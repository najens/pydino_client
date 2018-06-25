import { saveProject, editProject, deleteProject } from '../utils/apis/projects'
import { refreshTokenWrapper } from './csrfAccessToken'

// ACTION TYPES
export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST'
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE'
export const FETCH_ADD_PROJECT_REQUEST = 'FETCH_ADD_PROJECT_REQUEST'
export const FETCH_ADD_PROJECT_SUCCESS = 'FETCH_ADD_PROJECT_SUCCESS'
export const FETCH_ADD_PROJECT_FAILURE = 'FETCH_ADD_PROJECT_FAILURE'
export const FETCH_EDIT_PROJECT_REQUEST = 'FETCH_EDIT_PROJECT_REQUEST'
export const FETCH_EDIT_PROJECT_SUCCESS = 'FETCH_EDIT_PROJECT_SUCCESS'
export const FETCH_EDIT_PROJECT_FAILURE = 'FETCH_EDIT_PROJECT_FAILURE'
export const FETCH_DELETE_PROJECT_REQUEST = 'FETCH_DELETE_PROJECT_REQUEST'
export const FETCH_DELETE_PROJECT_SUCCESS = 'FETCH_DELETE_PROJECT_SUCCESS'
export const FETCH_DELETE_PROJECT_FAILURE = 'FETCH_DELETE_PROJECT_FAILURE'

// ACTIONS

/*
 * Fetch projects request action
 *
 * @return {Object}
 */
export function fetchProjectsRequest() {
  return {
    type: FETCH_PROJECTS_REQUEST
  }
}


/*
 * Fetch projects success action
 *
 * @return {Object}
 */
export function fetchProjectsSuccess(res) {
  const projects = res.projects
  const newProjects = {}
  if (typeof projects !== 'undefined') {
    projects.map((project) => (
      newProjects[project.id] = project
    ))
  }
  return {
    type: FETCH_PROJECTS_SUCCESS,
    projects: newProjects,
    message: res.success,
  }
}


/*
 * Fetch projects failure action
 *
 * @return {Object}
 */
export function fetchProjectsFailure(res) {
  return {
    type: FETCH_PROJECTS_FAILURE,
    message: res.error || 'Something went wrong!'
  }
}


/**
 * Add project request action
 *
 * @return {Object}
 */
function fetchAddProjectRequest(project) {
	return {
		type: FETCH_ADD_PROJECT_REQUEST,
		project,
	}
}


/**
 * Add project success action
 *
 * @return {Object}
 */
function fetchAddProjectSuccess(res) {
	return {
		type: FETCH_ADD_PROJECT_SUCCESS,
		project: res.project,
		message: res.success,
	}
}


/**
 * Add project failure action
 *
 * @return {Object}
 */
function fetchAddProjectFailure(res) {
	return {
		type: FETCH_ADD_PROJECT_FAILURE,
		message: res.error  || 'Something went wrong',
	}
}


/*
 * Edit project request action
 *
 * @return {Object}
 */
function fetchEditProjectRequest(project) {
  return {
    type: FETCH_EDIT_PROJECT_REQUEST,
    project,
  }
}


/*
 * Edit project success action
 *
 * @return {Object}
 */
function fetchEditProjectSuccess(res) {
  return {
    type: FETCH_EDIT_PROJECT_SUCCESS,
    project: res.project,
    message: res.success,
  }
}


/*
 * Edit project failure action
 *
 * @return {Object}
 */
function fetchEditProjectFailure(res) {
  return {
    type: FETCH_EDIT_PROJECT_FAILURE,
    message: res.error || 'Something went wrong',
  }
}


/*
 * Delete project request action
 *
 * @return {Object}
 */
function fetchDeleteProjectRequest(id) {
  return {
    type: FETCH_DELETE_PROJECT_REQUEST,
    id,
  }
}


/*
 * Delete project success action
 *
 * @return {Object}
 */
function fetchDeleteProjectSuccess(res) {
  return {
    type: FETCH_DELETE_PROJECT_SUCCESS,
    id: res.id,
    message: res.success,
  }
}


/*
 * Delete project failure action
 *
 * @return {Object}
 */
function fetchDeleteProjectFailure(res) {
  return {
    type: FETCH_DELETE_PROJECT_FAILURE,
    message: res.error || 'Something went wrong',
  }
}


// ACTION CREATORS

/**
 * Handles add project request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit add project request.
 *
 * @param {Object} project
 * @return {function} refreshTokenWrapper
 */
export function handleAddProject(project) {
  const args = [project]
  return refreshTokenWrapper(
    fetchAddProjectRequest,
    fetchAddProjectSuccess,
    fetchAddProjectFailure,
    saveProject,
    args,
  )
}


/**
 * Handles edit project request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit edit project request.
 *
 * @param {Object} project
 * @return {function} refreshTokenWrapper
 */
export function handleEditProject(project) {
  const args = [project]
  return refreshTokenWrapper(
    fetchEditProjectRequest,
    fetchEditProjectSuccess,
    fetchEditProjectFailure,
    editProject,
    args,
  )
}


/**
 * Handles delete project request and dispatches
 * actions based on server response. If access
 * token is expired, it will try to refresh the
 * token and double submit delete project request.
 *
 * @param {string} id
 * @return {function} refreshTokenWrapper
 */
export function handleDeleteProject(id) {
  const args = [id]
  return refreshTokenWrapper(
    fetchDeleteProjectRequest,
    fetchDeleteProjectSuccess,
    fetchDeleteProjectFailure,
    deleteProject,
    args,
  )
}
