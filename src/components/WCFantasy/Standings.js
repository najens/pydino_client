import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavTabs from './NavTabs'
import Group from './Group'

class Standings extends Component {
  render () {
    const { groupAIds, groupBIds, groupCIds, groupDIds, groupEIds,
      groupFIds, groupGIds, groupHIds
    } = this.props

	  return (
      <div>
        <NavTabs path='/' />
        <div className='container pg-margin'>
          <Group group='A' groupIds={groupAIds} />
          <Group group='B' groupIds={groupBIds} />
          <Group group='C' groupIds={groupCIds} />
          <Group group='D' groupIds={groupDIds} />
          <Group group='E' groupIds={groupEIds} />
          <Group group='F' groupIds={groupFIds} />
          <Group group='G' groupIds={groupGIds} />
          <Group group='H' groupIds={groupHIds} />
        </div>
      </div>
		)
  }
}

function mapStateToProps ({ teams }) {
  const filterAndSortGroup = (teams, grp) => {
    const groupIds = Object.keys(teams)
      .filter((a) => teams[a].group.includes(grp))
      .sort((a,b) => teams[b].GF - teams[a].GF)
    groupIds.sort((a,b) => teams[b].GD - teams[a].GD)
    groupIds.sort((a,b) => teams[b].Pts - teams[a].Pts)
    return groupIds
  }
  const groupAIds = filterAndSortGroup(teams, 'A')
  const groupBIds = filterAndSortGroup(teams, 'B')
  const groupCIds = filterAndSortGroup(teams, 'C')
  const groupDIds = filterAndSortGroup(teams, 'D')
  const groupEIds = filterAndSortGroup(teams, 'E')
  const groupFIds = filterAndSortGroup(teams, 'F')
  const groupGIds = filterAndSortGroup(teams, 'G')
  const groupHIds = filterAndSortGroup(teams, 'H')

  return {
    groupAIds,
    groupBIds,
    groupCIds,
    groupDIds,
    groupEIds,
    groupFIds,
    groupGIds,
    groupHIds,
  }
}

export default connect(mapStateToProps)(Standings)
