import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from '../Nav'
import { FaGithub, FaGlobe, FaCircle, FaPencil, FaTrash } from 'react-icons/lib/fa'
import aws_lightsail from '../../img/aws_lightsail.jpg'
import my_reads from '../../img/my_reads.jpg'
import fantasy_wc from '../../img/fantasy_wc.jpg'
import { NavLink } from 'react-router-dom'
import { isAdmin } from '../../utils/helpers'


const ProjectPage = ({ project, authedUser }) => {
	let imgSrc
	const imgs = [aws_lightsail, my_reads, fantasy_wc]
	const imgKeys = ['aws_lightsail', 'my_reads', 'fantasy_wc']
	const admin = isAdmin(authedUser)
	if (project) {
		const imgUrl = project.img_url
		for (let i = 0; i < imgs.length; i++) {
			if (imgUrl === imgKeys[i]) {
				imgSrc = imgs[i]
			}
		}
	}
	window.scrollTo(0, 0)
	if (!project) {
		return null
	}

  return (
    <div>
			<Nav path='/' />
			<div className='container pg-margin text-left'>
				{admin &&
					<div className='d-flex justify-content-end'>
						<NavLink className='mr-3' to={`/project/${project.id}/edit`} exact><FaPencil /></NavLink>
						<NavLink to={`/project/${project.id}/delete`} exact><FaTrash /></NavLink>
					</div>
				}
				<div className='d-flex justify-content-between'>
					<h2>{project.title}</h2>
					<div className='d-flex'>
						{project.github_url &&
							<a className='project-links' href={project.github_url}>
								View on GitHub  <FaGithub className='link-icon' />
							</a>
						}
						{project.site_url &&
							<a className='project-links' href={project.site_url}>
								Go to App  <FaGlobe className='link-icon' />
							</a>
						}
					</div>
				</div>
				<ul className='d-flex'>
					{project.topics.map((topic, index) => (
						<li className='topic' key={index}><FaCircle className='topic-dot'/> {topic.name}</li>
					))}
				</ul>
				<div className='d-flex'>
					<img className='project-img' src={imgSrc} />
				</div>
				<div className='read-me' dangerouslySetInnerHTML={{__html: project.read_me}}></div>
			</div>
    </div>
  )
}

function mapStateToProps({ projects, authedUser }, props) {
	const { id } = props.match.params
  const project = projects[id]
	return {
		project,
		authedUser,
	}
}

export default connect(mapStateToProps)(ProjectPage)
