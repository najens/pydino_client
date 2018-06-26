import React from 'react'
import { connect } from 'react-redux'
import BracketTeam from './BracketTeam'
import BrTeamName from './BrTeamName'

const Elimination = ({ game, groupPicks, group2Picks, picks, allowDrop, drag, drop, bracket }) => {

	let pick1
	let pick2
	let pick
	let game1
	let game2
	if (game === 'r16_1') {
		game1 = 'grp_a_1'
		game2 = 'grp_b_2'
		pick1 = groupPicks.grp_a_1
		pick2 = groupPicks.grp_b_2
		pick = picks.r16_1
	}
	if (game === 'r16_2') {
		game1 = 'grp_c_1'
		game2 = 'grp_d_2'
		pick1 = groupPicks.grp_c_1
		pick2 = picks.grp_d_2
		pick = picks.r16_2
	}
	if (game === 'r16_3') {
		game1 = 'grp_e_1'
		game2 = 'grp_f_2'
		pick1 = groupPicks.grp_e_1
		pick2 = groupPicks.grp_f_2
		pick = picks.r16_3
	}
	if (game === 'r16_4') {
		game1 = 'grp_g_1'
		game2 = 'grp_h_2'
		pick1 = groupPicks.grp_g_1
		pick2 = groupPicks.grp_h_2
		pick = picks.r16_4
	}
	if (game === 'r16_5') {
		game1 = 'grp_b_1'
		game2 = 'grp_a_2'
		pick1 = groupPicks.grp_b_1
		pick2 = groupPicks.grp_a_2
		pick = picks.r16_5
	}
	if (game === 'r16_6') {
		game1 = 'grp_d_1'
		game2 = 'grp_c_2'
		pick1 = groupPicks.grp_d_1
		pick2 = groupPicks.grp_c_2
		pick = picks.r16_6
	}
	if (game === 'r16_7') {
		game1 = 'grp_f_1'
		game2 = 'grp_e_2'
		pick1 = groupPicks.grp_f_1
		pick2 = groupPicks.grp_e_2
		pick = picks.r16_7
	}
	if (game === 'r16_8') {
		game1 = 'grp_h_1'
		game2 = 'grp_g_2'
		pick1 = groupPicks.grp_h_1
		pick2 = groupPicks.grp_g_2
		pick = picks.r16_8
	}
	if (game === 'r8_1') {
		game1 = 'r16_1'
		game2 = 'r16_2'
		pick1 = groupPicks.r16_1
		pick2 = groupPicks.r16_2
		pick = picks.r8_1
	}
	if (game === 'r8_2') {
		game1 = 'r16_3'
		game2 = 'r16_4'
		pick1 = groupPicks.r16_3
		pick2 = groupPicks.r16_4
		pick = picks.r8_2
	}
	if (game === 'r8_3') {
		game1 = 'r16_5'
		game2 = 'r16_6'
		pick1 = groupPicks.r16_5
		pick2 = groupPicks.r16_6
		pick = picks.r8_3
	}
	if (game === 'r8_4') {
		game1 = 'r16_7'
		game2 = 'r16_8'
		pick1 = groupPicks.r16_7
		pick2 = groupPicks.r16_8
		pick = picks.r8_4
	}
	if (game === 'r4_1') {
		game1 = 'r8_1'
		game2 = 'r8_2'
		pick1 = groupPicks.r8_1
		pick2 = groupPicks.r8_2
		pick = picks.r4_1
	}
	if (game === 'r4_2') {
		game1 = 'r8_3'
		game2 = 'r8_4'
		pick1 = groupPicks.r8_3
		pick2 = groupPicks.r8_4
		pick = picks.r4_2
	}
	if (game === 'r2_1') {
		game1 = 'r4_1'
		game2 = 'r4_2'
		pick1 = groupPicks.r4_1
		pick2 = groupPicks.r4_2
		pick = picks.r2_1
	}
	if (game === 'r2_2') {
		if (group2Picks.r8_1 === groupPicks.r4_1) {
			game1 = 'r8_2'
			pick1 = group2Picks.r8_2
		} else {
			game1 = 'r8_1'
			pick1 = group2Picks.r8_1
		}
		if (group2Picks.r8_3 === groupPicks.r4_2) {
			game2 = 'r8_4'
			pick2 = group2Picks.r8_4
		} else {
			game2 = 'r8_3'
			pick2 = group2Picks.r8_3
		}
		pick = picks.r2_2
	}

	if(Object.keys(bracket).length === 0) {
		return (
			<div className='ml-4 mt-4 mb-4 d-flex align-items-center'>
				<div>
					<BracketTeam key={`${game1}-${game}`} id={pick1} allowDrop={allowDrop} drop={drop} drag={drag} game={game} pgame={game1} />
					<BracketTeam key={`${game2}-${game}`} id={pick2} allowDrop={allowDrop} drop={drop} drag={drag} game={game} pgame={game2} />
				</div>
				<div className='pick-container d-flex align-items-center'>
					<div key={game} id={game} className='flag-container' onDrop={drop} onDragOver={allowDrop}></div>
					<BrTeamName id={pick} />
				</div>
			</div>
		)
	}
	return (
		<div className='ml-4 mt-4 mb-4 d-flex align-items-center'>
			<div>
				<BracketTeam key={`${game1}-${game}`} id={pick1} game={game} pgame={game1} bracket='nodrag' />
				<BracketTeam key={`${game2}-${game}`} id={pick2} game={game} pgame={game2} bracket='nodrag '/>
			</div>
			<div className='pick-container d-flex align-items-center'>
				<div key={game} id={game} className='flag-container'>
					<BracketTeam key={pick} id={pick} bracket='img' />
				</div>
				<BrTeamName id={pick} />
			</div>
		</div>
	)
}

export default connect()(Elimination)
