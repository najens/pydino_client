import React, { Component } from 'react'
import { connect } from 'react-redux'
import Project from './Project'

class ProjectList extends Component {
  state ={
    sortBy: 'all',
		allIds: [],
		filteredIds: [],
		start: 0,
		index: 5,
		totalPages: null
  }

  // Use new static method to derive state from props
  static getDerivedStateFromProps(nextProps, prevState) {
		// If the props have changed, set new state
  	if(nextProps.allIds !== prevState.allIds) {
    	return {
				allIds: nextProps.allIds,
      	filteredIds: nextProps.allIds.slice(0, 5),
     	};
    }

   	// Otherwise, do not update state
    return null;
  }

	// Determines how many projects to load and which sortBy array
	// to use, and then add that number of projects to the state
	loadReviews = () => {
		const { filteredIds, start, index, sortBy } = this.state
		const { numProjects } = this.props
		const filteredIdsToShow = this.sortProjectsBy(sortBy)
		const remaining = numProjects - start + index
		// If there are more results left than the index value,
		// get the projects from the start to the index
		if (remaining >= index) {
			const filteredIdsToAdd = filteredIdsToShow.slice(start, start + index)
			this.setState(() => ({
        filteredIds: [...filteredIds, ...filteredIdsToAdd]
      }))
		}
		// If the remaining results left is between 0 and 10,
		// get the reviews from the start to the remaining
		else if (remaining < index && remaining > 0) {
			const filteredIdsToAdd = filteredIdsToShow.slice(start, numProjects)
			this.setState(() => ({
        filteredIds: [...filteredIds, ...filteredIdsToAdd]
      }))
		}
		// Otherwise, return since there are no more reviews to load
		else {
			return
		}
	}

	// Updates the start state and then calls
	// the function to load more projects
	loadMore = () => {
		this.setState((prevState) => ({
			start: prevState.start + prevState.index
		}), this.loadReviews)
	}

	// Determines which sorted list to show
	// based on the sortBy state
	sortProjectsBy = (sortBy) => {
		const {allIds, reactProjectIds, javascriptProjectIds,
      pythonProjectIds, androidProjectIds
    } = this.props
		switch(sortBy) {
			case 'all' :
				return allIds
			case 'react' :
				return reactProjectIds
			case 'javascript' :
				return javascriptProjectIds
      case 'python' :
        return pythonProjectIds
      case 'android' :
        return androidProjectIds
			default :
				return allIds
		}
	}

	// Update the sortBy state and reset
	// the start and filteredIds list
	handleSelectChange = (e) => {
		const sortBy = e.target.value
		this.setState(() => ({
			sortBy,
			filteredIds: [],
			start: 0,
		}), this.loadReviews)
	}

  render() {
    const { filteredIds } = this.state
    const { numProjects, numReactProjects, numJavascriptProjects,
      numPythonProjects, numAndroidProjects
    } = this.props

    return (
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-end'>
          <select className='form-control w-25 justify-content-right' onChange={this.handleSelectChange}>
  				  <option value='all'>{`All (${numProjects})`}</option>
  				  <option value='react'>{`React (${numReactProjects})`}</option>
  				  <option value='javascript'>{`Javascript (${numJavascriptProjects})`}</option>
            <option value='python'>{`Python (${numPythonProjects})`}</option>
            <option value='android'>{`Android (${numAndroidProjects})`}</option>
  				</select>
        </div>
        <div className="d-flex flex-col w-100">
          {filteredIds.map((id) => (
            <article key={id}>
              <Project id={id} />
            </article>
          ))}
        </div>
        <div className='d-flex justify-content-center mt-4 mb-4'>
					<a className='btn btn-primary' onClick={this.loadMore}>Show More</a>
				</div>
      </div>
    )
  }
}

function mapStateToProps({ projects, topics }) {
  let reactProjectIds
  let javascriptProjectIds
  let pythonProjectIds
  let androidProjectIds
  let numReactProjects
  let numJavascriptProjects
  let numPythonProjects
  let numAndroidProjects

  const allIds = Object.keys(projects)
  const numProjects = allIds.length
  const reactId = Object.keys(topics)
    .filter((a) => topics[a].name === 'React')[0]
  const javascriptId = Object.keys(topics)
    .filter((a) => topics[a].name === 'JavaScript')[0]
  const pythonId = Object.keys(topics)
    .filter((a) => topics[a].name === 'Python')[0]
  const androidId = Object.keys(topics)
    .filter((a) => topics[a].name === 'Android')[0]

  if (reactId) {
    reactProjectIds = topics[reactId].project
    numReactProjects = reactProjectIds.length
  }
  if (javascriptId) {
    javascriptProjectIds = topics[javascriptId].project
    numJavascriptProjects = javascriptProjectIds.length
  }
  if (pythonId) {
    pythonProjectIds = topics[pythonId].project
    numPythonProjects = pythonProjectIds.length
  }
  if (androidId) {
    androidProjectIds = topics[androidId].project
    numAndroidProjects = androidProjectIds.length
  }

  return {
    allIds,
    reactProjectIds,
    javascriptProjectIds,
    pythonProjectIds,
    androidProjectIds,
    numProjects,
    numReactProjects,
    numJavascriptProjects,
    numPythonProjects,
    numAndroidProjects,
  }
}

export default connect(mapStateToProps)(ProjectList)
