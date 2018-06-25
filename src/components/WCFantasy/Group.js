import React from 'react'
import Team from './Team'

const Group = ({ group, groupIds }) => (
	<div>
		<ul>
			<div className='d-flex justify-content-between group-heading'>
				<div className='st-team'>{`Group ${group}`}</div>
				<div className='d-flex justify-content-between st-score-hd w-100'>
					<div className='pl-2 pr-2 st-col'>MP</div>
					<div className='pl-2 pr-2 st-col'>W</div>
					<div className='pl-2 pr-2 st-col'>D</div>
					<div className='pl-2 pr-2 st-col'>L</div>
					<div className='pl-2 pr-2 st-col'>GF</div>
					<div className='pl-2 pr-2 st-col'>GA</div>
					<div className='pl-2 pr-2 st-col'>GD</div>
					<div className='pl-2 pr-2 st-col'>Pts</div>
				</div>
      </div>
			{groupIds.map((id) => (
				<li className='list-group-item' key={id}>
					<Team id={id} />
				</li>
			))}
		</ul>
	</div>
)

export default Group
