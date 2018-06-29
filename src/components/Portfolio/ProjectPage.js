import React from 'react'
import { connect } from 'react-redux'
import Nav from '../Nav'
import { FaGithub, FaGlobe, FaCircle, FaPencil, FaTrash } from 'react-icons/lib/fa'
import aws_lightsail from '../../img/aws_lightsail.jpg'
import my_reads from '../../img/my_reads.jpg'
import fantasy_wc from '../../img/fantasy_wc.jpg'
import item_catalog from '../../img/item_catalog.jpg'
import neighborhood_map from '../../img/neighborhood_map.jpg'
import inventory_app from '../../img/inventory_app.jpg'
import portfolio from '../../img/portfolio.jpg'
import movie_trailer from '../../img/movie_trailer.png'
import book_listing from '../../img/book_listing.jpg'
import football_counter from '../../img/football_counter.jpg'
import habit_tracker from '../../img/habit_tracker.jpg'
import musical_structure from '../../img/musical_structure.jpg'
import news_analytics from '../../img/news_analytics.jpg'
import news_app from '../../img/news_app.png'
import quiz_app from '../../img/quiz_app.jpg'
import single_screen from '../../img/single_screen.jpg'
import tour_guide from '../../img/tour_guide.jpg'
import wiki_crawler from '../../img/wiki_crawler.jpg'
import { NavLink } from 'react-router-dom'
import { isAdmin } from '../../utils/helpers'
import showdown from 'showdown'


const ProjectPage = ({ project, authedUser }) => {
	let imgSrc
	const imgs = [aws_lightsail, my_reads, fantasy_wc, item_catalog,
		neighborhood_map, inventory_app, portfolio, movie_trailer, book_listing,
		football_counter, habit_tracker, musical_structure, news_analytics,
		news_app, quiz_app, single_screen, tour_guide, wiki_crawler
	]
	const imgKeys = ['aws_lightsail', 'my_reads', 'fantasy_wc', 'item_catalog',
		'neighborhood_map', 'inventory_app', 'portfolio', 'movie_trailer',
		'book_listing', 'football_counter', 'habit_tracker', 'musical_structure',
		'news_analytics', 'news_app', 'quiz_app', 'single_screen', 'tour_guide',
		'wiki_crawler'
	]
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
	const converter = new showdown.Converter()
  const innerHTML = converter.makeHtml(project.read_me)

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
					<img className='project-img mb-3' src={imgSrc} />
				</div>
				<p>{project.description}</p>
				<div className='read-me' dangerouslySetInnerHTML={{__html: innerHTML}}></div>
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
