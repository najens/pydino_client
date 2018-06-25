import React from 'react'
import BracketTeam from './BracketTeam'
import BrTeamName from './BrTeamName'

const BracketGroup = ({ group, groupIds, picks, allowDrop, drag, drop, bracket }) => {
	const pick1 = picks[`grp_${group.toLowerCase()}_1`]
	const pick2 = picks[`grp_${group.toLowerCase()}_2`]
	// const filteredIds = groupIds.filter((a) => a !== pick1.toString() && a !== pick2.toString())

	if (Object.keys(bracket).length === 0 || bracket.grp_a_1 === 0 ||
		bracket.grp_a_2 === 0 || bracket.grp_b_1 === 0 || bracket.grp_b_2 === 0 ||
		bracket.grp_c_1 === 0 || bracket.grp_c_2 === 0 || bracket.grp_d_1 === 0 ||
		bracket.grp_d_2 === 0 || bracket.grp_e_1 === 0 || bracket.grp_e_2 === 0 ||
		bracket.grp_f_1 === 0 || bracket.grp_f_2 === 0 || bracket.grp_g_1 === 0 ||
		bracket.grp_g_2 === 0 || bracket.grp_h_1 === 0 || bracket.grp_h_2 === 0
	) {
		return (
			<div className='card mt-4 mb-4'>
				<h4>{`Group ${group}`}</h4>
				<div className='d-flex justify-content-center'>
					{groupIds.map((id) => (
						<BracketTeam key={id} id={id} allowDrop={allowDrop} drag={drag} drop={drop} />
					))}
				</div>
				<div className='pick-container d-flex align-items-center'>
					<h2 className='rank'>1st</h2>
					<div id={`grp_${group.toLowerCase()}_1`} className='flag-container' onDrop={drop} onDragOver={allowDrop}></div>
					<BrTeamName id={pick1} />
				</div>
				<div className='pick-container d-flex align-items-center'>
					<h2 className='rank'>2nd</h2>
					<div id={`grp_${group.toLowerCase()}_2`} className='flag-container' onDrop={drop} onDragOver={allowDrop}></div>
					<BrTeamName id={pick2} />
				</div>
			</div>
		)
	}
	return (
		<div className='card mt-4 mb-4'>
			<h4>{`Group ${group}`}</h4>
			<div className='d-flex justify-content-center'>
				{groupIds.map((id) => (
					<BracketTeam key={id} id={id} bracket={'nodrag'} />
				))}
			</div>
			<div className='pick-container d-flex align-items-center'>
				<h3 className='rank'>1st</h3>
				<div id={`grp_${group.toLowerCase()}_1`} className='flag-container'>
					<BracketTeam key={pick1} id={pick1} bracket='img' />
				</div>
				<BrTeamName id={pick1} />
			</div>
			<div className='pick-container d-flex align-items-center'>
				<h3 className='rank'>2nd</h3>
				<div id={`grp_${group.toLowerCase()}_2`} className='flag-container'>
					<BracketTeam key={pick2} id={pick2} bracket='img' />
				</div>
				<BrTeamName id={pick2} />
			</div>
		</div>
	)
}

export default BracketGroup
