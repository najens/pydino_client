import React from 'react'
import { connect } from 'react-redux'
import { isAdmin } from '../../utils/helpers'
import { FaPencil, FaTrash } from 'react-icons/lib/fa'
import { NavLink } from 'react-router-dom'
import ru from '../../icons/ru.svg'
import sa from '../../icons/sa.svg'
import eg from '../../icons/eg.svg'
import uy from '../../icons/uy.svg'
import pt from '../../icons/pt.svg'
import es from '../../icons/es.svg'
import ma from '../../icons/ma.svg'
import ir from '../../icons/ir.svg'
import fr from '../../icons/fr.svg'
import au from '../../icons/au.svg'
import pe from '../../icons/pe.svg'
import dk from '../../icons/dk.svg'
import ar from '../../icons/ar.svg'
import is from '../../icons/is.svg'
import hr from '../../icons/hr.svg'
import ng from '../../icons/ng.svg'
import br from '../../icons/br.svg'
import ch from '../../icons/ch.svg'
import cr from '../../icons/cr.svg'
import rs from '../../icons/rs.svg'
import de from '../../icons/de.svg'
import mx from '../../icons/mx.svg'
import se from '../../icons/se.svg'
import kr from '../../icons/kr.svg'
import be from '../../icons/be.svg'
import pa from '../../icons/pa.svg'
import tn from '../../icons/tn.svg'
import en from '../../icons/en.svg'
import pl from '../../icons/pl.svg'
import sn from '../../icons/sn.svg'
import co from '../../icons/co.svg'
import jp from '../../icons/jp.svg'

const Game = ({ id, game, team1, team2, date, time, authedUser }) => {
	let imgSrc1
	let imgSrc2
	const imgs = [ru, sa, eg, uy, pt, es, ma, ir, fr, au, pe, dk, ar, is, hr, ng,
		br, ch, cr, rs, de, mx, se, kr, be, pa, tn, en, pl, sn, co, jp
	]
	const imgKeys = ['ru', 'sa', 'eg', 'uy', 'pt', 'es', 'ma', 'ir', 'fr', 'au',
		'pe', 'dk', 'ar', 'is', 'hr', 'ng', 'br', 'ch', 'cr', 'rs', 'de', 'mx',
		'se', 'kr', 'be', 'pa', 'tn', 'en', 'pl', 'sn', 'co', 'jp'
	]

	const t1Iso_2 = team1.iso_2
	for (let i = 0; i < imgs.length; i++) {
		if (t1Iso_2 === imgKeys[i]) {
			imgSrc1 = imgs[i]
		}
	}
	const t2Iso_2 = team2.iso_2
	for (let i = 0; i < imgs.length; i++) {
		if (t2Iso_2 === imgKeys[i]) {
			imgSrc2 = imgs[i]
		}
	}
	const admin = isAdmin(authedUser)
	return (
		<div className='list-group-item mb-3'>
			{admin &&
				<div className='d-flex justify-content-end'>
					<NavLink className='mr-3' to={`/world-cup-fantasy/match/${game.id}/edit`} exact><FaPencil /></NavLink>
					<NavLink to={`/world-cup-fantasy/match/${game.id}/delete`} exact><FaTrash /></NavLink>
				</div>
			}
			<div className='mb-4'>{game.title}</div>
			<div className='d-flex justify-content-between'>
				<div className='gm-team-ct'>
					<div className='d-flex'>
						<div className='d-flex mb-3 align-items-center gm-team'>
							<img className='flag-standings mr-2' alt={team1.iso_2} src={imgSrc1} />
							<div>{team1.name}</div>
						</div>
						<div>{game.team1_score}</div>
					</div>
					<div className='d-flex'>
						<div className='d-flex mb-3 align-items-center gm-team'>
							<img className='flag-standings mr-2' alt={team2.iso_2} src={imgSrc2} />
							<div>{team2.name}</div>
						</div>
						<div>{game.team2_score}</div>
					</div>
				</div>
				<div>
					<div>{date}</div>
					<div>{time}</div>
				</div>
			</div>
		</div>
	)
}

function mapStateToProps ({ matches, teams, authedUser }, {id}) {
	const game = matches[id]
	const dateObj = new Date(game.date)
	const day = dateObj.getDate()
	const weekday = dateObj.getDay()
	const month = dateObj.getMonth()
	const hours = dateObj.getHours()
	const monName = getMonName(month)
	const dayName = getDayName(weekday)
	const date = `${dayName}, ${monName} ${day}`
	const time = getTimeString(hours)
	const team1 = teams[game.team1]
	const team2 = teams[game.team2]
	return {
		game,
		team1,
		team2,
		date,
		time,
		authedUser,
	}
}

const getTimeString = (hr) => {
	switch(hr) {
		case 0 :
			return '12:00 AM'
		case 1 :
			return '1:00 AM'
		case 2 :
			return '2:00 AM'
		case 3 :
			return '3:00 AM'
		case 4 :
			return '4:00 AM'
		case 5 :
			return '5:00 AM'
		case 6 :
			return '6:00 AM'
		case 7 :
			return '7:00 AM'
		case 8 :
			return '8:00 AM'
		case 9 :
			return '9:00 AM'
		case 10 :
			return '10:00 AM'
		case 11 :
			return '11:00 AM'
		case 12 :
			return '12:00 PM'
		case 13 :
			return '1:00 PM'
		case 14 :
			return '2:00 PM'
		case 15 :
			return '3:00 PM'
		case 16 :
			return '4:00 PM'
		case 17 :
			return '5:00 PM'
		case 18 :
			return '6:00 PM'
		case 19 :
		return '7:00 PM'
		case 20 :
			return '8:00 PM'
		case 21 :
			return '9:00 PM'
		case 22 :
			return '10:00 PM'
		case 23 :
			return '11:00 PM'
		default :
			return null
	}
}
const getDayName = (weekday) => {
	switch(weekday) {
		case 0 :
			return 'Sun'
		case 1 :
			return 'Mon'
		case 2 :
			return 'Tue'
		case 3 :
			return 'Wed'
		case 4 :
			return 'Thu'
		case 5 :
			return 'Fri'
		case 6 :
			return 'Sat'
		default:
			return null
	}
}

const getMonName = (month) => {
	switch(month) {
		case 0 :
			return 'Jan'
		case 1 :
			return 'Feb'
		case 2 :
			return 'Mar'
		case 3 :
			return 'Apr'
		case 4 :
			return 'May'
		case 5 :
			return 'Jun'
		case 6 :
			return 'Jul'
		case 7 :
			return 'Aug'
		case 8 :
			return 'Sep'
		case 9 :
			return 'Oct'
		case 10 :
			return 'Nov'
		case 11 :
			return 'Dec'
		default :
			return null
	}
}

export default connect(mapStateToProps)(Game)
