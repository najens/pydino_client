import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavTabs from './NavTabs'
import Game from './Game'

class Matches extends Component {

  render () {
    const { grp1Keys, grp2Keys, grp3Keys, r16Keys, r8Keys, r4Keys,
      r2Keys
    } = this.props
	  return (
      <div>
        <NavTabs path='/' />
        <div className='container pg-margin'>
          <h5 className='gm-heading'>Group Stage - Match 1 of 3</h5>
          {grp1Keys.map((id) => (
            <Game key={id} id={id} />
          ))}
          <h5 className='gm-heading'>Group Stage - Match 2 of 3</h5>
          {grp2Keys.map((id) => (
            <Game key={id} id={id} />
          ))}
          <h5 className='gm-heading'>Group Stage - Match 3 of 3</h5>
          {grp3Keys.map((id) => (
            <Game key={id} id={id} />
          ))}
          {r16Keys.length !== 0 && <h5 className='gm-heading'>Round of 16</h5>}
            {r16Keys.length !== 0 && r16Keys.map((id) => <Game key={id} id={id} />)}
          {r8Keys.length !== 0 && <h5 className='gm-heading'>Quarter-finals</h5>}
          {r8Keys.length !== 0 && r8Keys.map((id) => (
            <Game key={id} id={id} />
          ))}
          {r4Keys.length !== 0 && <h5 className='gm-heading'>Semi-finals</h5>}
          {r4Keys.length !== 0 && r4Keys.map((id) => (
            <Game key={id} id={id} />
          ))}
          {r2Keys.length !== 0 && <h5 className='gm-heading'>Final</h5>}
          {r2Keys.length !== 0 && r2Keys.map((id) => (
            <Game key={id} id={id} />
          ))}
        </div>
      </div>
		)
  }
}

function mapStateToProps ({ matches }) {
  return {
    grp1Keys: Object.keys(matches)
      .filter((a) => matches[a].round.includes('grp1')),
    grp2Keys: Object.keys(matches)
      .filter((a) => matches[a].round.includes('grp2')),
    grp3Keys: Object.keys(matches)
      .filter((a) => matches[a].round.includes('grp3')),
    r16Keys: Object.keys(matches)
      .filter((a) => matches[a].round.includes('r16')),
    r8Keys: Object.keys(matches)
      .filter((a) => matches[a].round.includes('r8')),
    r4Keys: Object.keys(matches)
      .filter((a) => matches[a].round.includes('r4')),
    r2Keys: Object.keys(matches)
      .filter((a) => matches[a].round.includes('r2')),
  }
}

export default connect(mapStateToProps)(Matches)
