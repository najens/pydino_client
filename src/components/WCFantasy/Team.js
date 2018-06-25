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

class Team extends Component {
  render() {
    const { team } = this.props
		let imgSrc
		const imgs = [ru, sa, eg, uy, pt, es, ma, ir, fr, au, pe, dk, ar, is, hr, ng,
			br, ch, cr, rs, de, mx, se, kr, be, pa, tn, en, pl, sn, co, jp
		]
		const imgKeys = ['ru', 'sa', 'eg', 'uy', 'pt', 'es', 'ma', 'ir', 'fr', 'au',
			'pe', 'dk', 'ar', 'is', 'hr', 'ng', 'br', 'ch', 'cr', 'rs', 'de', 'mx',
			'se', 'kr', 'be', 'pa', 'tn', 'en', 'pl', 'sn', 'co', 'jp'
		]

		const iso_2 = team.iso_2
		for (let i = 0; i < imgs.length; i++) {
			if (iso_2 === imgKeys[i]) {
				imgSrc = imgs[i]
			}
		}
    return (
      <div className='d-flex justify-content-between'>
				<div className='d-flex align-items-center st-team'>
					<img className='flag-standings mr-2' alt={team.iso_2} src={imgSrc} />
					<div>{team.name}</div>
				</div>
				<div className='d-flex justify-content-around w-100'>
					<div className='pl-2 pr-2 st-col'>{team.MP || 0}</div>
					<div className='pl-2 pr-2 st-col'>{team.W || 0}</div>
					<div className='pl-2 pr-2 st-col'>{team.D || 0}</div>
					<div className='pl-2 pr-2 st-col'>{team.L || 0}</div>
					<div className='pl-2 pr-2 st-col'>{team.GF || 0}</div>
					<div className='pl-2 pr-2 st-col'>{team.GA || 0}</div>
					<div className='pl-2 pr-2 st-col'>{team.GD || 0}</div>
					<div className='pl-2 pr-2 st-col'>{team.Pts || 0}</div>
				</div>
      </div>
    );
  }
}

function mapStateToProps ({ teams }, {id}) {
  const team = teams[id]
  return {
    team,
  }
}

export default connect(mapStateToProps)(Team);
