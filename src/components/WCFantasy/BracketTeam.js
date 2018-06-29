import React, { Component } from 'react'
import { connect } from 'react-redux'
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

class BracketTeam extends Component {
	render() {

		const { team, allowDrop, drag, drop, bracket, pgame, game } = this.props
		let imgSrc
		const imgs = [ru, sa, eg, uy, pt, es, ma, ir, fr, au, pe, dk, ar, is, hr, ng,
			br, ch, cr, rs, de, mx, se, kr, be, pa, tn, en, pl, sn, co, jp
		]
		const imgKeys = ['ru', 'sa', 'eg', 'uy', 'pt', 'es', 'ma', 'ir', 'fr', 'au',
			'pe', 'dk', 'ar', 'is', 'hr', 'ng', 'br', 'ch', 'cr', 'rs', 'de', 'mx',
			'se', 'kr', 'be', 'pa', 'tn', 'en', 'pl', 'sn', 'co', 'jp'
		]

		if (!team) {
			return null
		}

		const iso_2 = team.iso_2
		for (let i = 0; i < imgs.length; i++) {
			if (iso_2 === imgKeys[i]) {
				imgSrc = imgs[i]
			}
		}

		if(bracket === 'img') {
			return (
				<img id={team.id} className='flag' alt={team.iso_2} src={imgSrc} />
			)
		}

		if(bracket === 'container') {
			return (
				<div className='d-flex flex-column'>
					<div className='flag-text'>{team.name || null}</div>
					<div id={game ? `${pgame}-${game}` : `flag-${team.id}`}>
						<div className='flag-container'></div>
					</div>
				</div>
			)
		}

		if(bracket === 'nodrag') {
			return (
				<div className='d-flex flex-column'>
					<div className='flag-text'>{team.name || null}</div>
					<div id={game ? `${pgame}-${game}` : `flag-${team.id}`}>
						<div className='flag-container'>
							<img id={team.id} className='flag' alt={team.iso_2} src={imgSrc} />
						</div>
					</div>
				</div>
			)
		}

		return (
			<div className='d-flex flex-column'>
				<div className='flag-text'>{team.name || null}</div>
				<div className='flag-container' id={game ? `${pgame}-${game}` : `flag-${team.id}`} onDrop={drop} onDragOver={allowDrop}>
					<img id={team.id} className='flag' alt={team.iso_2} src={imgSrc} draggable='true' onDragStart={drag} />
				</div>
			</div>
		)
	}
}

function mapStateToProps ({ teams }, {id, allowDrop, drag, drop, bracket, pgame, game}) {
  const team = teams[id]
  return {
    team,
		allowDrop,
		drag,
		drop,
		bracket,
		pgame,
		game,
  }
}

export default connect(mapStateToProps)(BracketTeam)
