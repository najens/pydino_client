import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaCircle } from 'react-icons/lib/fa'
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
