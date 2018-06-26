import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaCircle } from 'react-icons/lib/fa'
import aws_lightsail from '../../img/aws_lightsail.jpg'
import my_reads from '../../img/my_reads.jpg'
import fantasy_wc from '../../img/fantasy_wc.jpg'
import pydinoFantasySm from '../../img/pydino-fantasy-sm.png'

class Project extends Component {
  render() {
    const { project } = this.props
		// <ul>
		//     {project.topics.map((topic, index) => (
		//         <li key={index} className="project-category">{topic}</li>
		//     ))}
		// </ul>
		// TODO:  Figure out how to get host and receive images from database

    let imgSrc
  	const imgs = [aws_lightsail, my_reads, fantasy_wc]
  	const imgKeys = ['aws_lightsail', 'my_reads', 'fantasy_wc']
  	if (project) {
  		const imgUrl = project.img_url
  		for (let i = 0; i < imgs.length; i++) {
  			if (imgUrl === imgKeys[i]) {
  				imgSrc = imgs[i]
  			}
  		}
  	}
    const title = project.title.toLowerCase()
    const titleArray = title.split(' ')
    let url_title = ''
    for (let i = 0; i < titleArray.length - 1; i++) {
      url_title += `${titleArray[i]}-`
    }
    url_title += titleArray.pop()


    return (
			<Link to={`/project/${project.id}/${url_title}`}>
				<div className="flex-row portfolio-container">
					<div className="portfolio-img-box d-flex align-items-center"><img alt={project.alt} src={imgSrc}/></div>
					<div className="flex-col portfolio-text">
						<h4 className="portfolio-title blue-dark" id={`portfolio-project-${project.id}`}>{project.title}</h4>
						<p className="portfolio-description">{project.description}</p>
            <p className='topic'><FaCircle className='topic-dot'/> {project.topic_main}</p>
					</div>
				</div>
			</Link>
    )
  }
}

function mapStateToProps ({ projects }, {id}) {
  const project = projects[id]
  return {
    project,
  }
}

export default connect(mapStateToProps)(Project);
