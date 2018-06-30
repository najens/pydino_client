import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import 'drag-drop-touch'
import BracketGroup from './BracketGroup'
import { handleFetchBracket, handleAddBracket, handleEditBracket, storeBracket } from '../../actions/brackets'
import { FaArrowLeft } from 'react-icons/lib/fa'
import FetchSuccess from '../FetchSuccess'
import FetchError from '../FetchError'
import { Redirect } from 'react-router-dom'
import NavTabs from './NavTabs'
import BracketTeam from './BracketTeam'
import BrTeamName from './BrTeamName'

class Bracket extends Component {
  state = {
    bracket: {},
    transfering: '',
    dropped: '',
    page: 1,
    groupPicks: {},
    r16Picks: {},
    r8Picks: {},
    r4Picks: {},
    id: '',
    grp_a_1: '',
    grp_a_2: '',
    grp_b_1: '',
    grp_b_2: '',
    grp_c_1: '',
    grp_c_2: '',
    grp_d_1: '',
    grp_d_2: '',
    grp_e_1: '',
    grp_e_2: '',
    grp_f_1: '',
    grp_f_2: '',
    grp_g_1: '',
    grp_g_2: '',
    grp_h_1: '',
    grp_h_2: '',
    r16_1: '',
    r16_2: '',
    r16_3: '',
    r16_4: '',
    r16_5: '',
    r16_6: '',
    r16_7: '',
    r16_8: '',
    r8_1: '',
    r8_2: '',
    r8_3: '',
    r8_4: '',
    r4_1: '',
    r4_2: '',
    r2_1: '',
    r2_2: '',
    toSignup: false,
    grp_a_1Changed: false,
    grp_a_2Changed: false,
    grp_b_1Changed: false,
    grp_b_2Changed: false,
    grp_c_1Changed: false,
    grp_c_2Changed: false,
    grp_d_1Changed: false,
    grp_d_2Changed: false,
    grp_e_1Changed: false,
    grp_e_2Changed: false,
    grp_f_1Changed: false,
    grp_f_2Changed: false,
    grp_g_1Changed: false,
    grp_g_2Changed: false,
    grp_h_1Changed: false,
    grp_h_2Changed: false,
    r16_1Changed: false,
    r16_2Changed: false,
    r16_3Changed: false,
    r16_4Changed: false,
    r16_5Changed: false,
    r16_6Changed: false,
    r16_7Changed: false,
    r16_8Changed: false,
    r8_1Changed: false,
    r8_2Changed: false,
    r8_3Changed: false,
    r8_4Changed: false,
    r4_1Changed: false,
    r4_2Changed: false,
    r2_1Changed: false,
    r2_2Changed: false,
  }

  // Use new static method to derive state from props
  static getDerivedStateFromProps(nextProps, prevState) {
		// If the props have changed, set new state
  	if(nextProps.bracket !== prevState.bracket) {
      const bracket =nextProps.bracket
      if (!bracket) {
        return null
      }
      if (Object.keys(bracket).length === 0) {
        return null
      }
    	return {
				bracket: bracket,
        id: bracket.id,
        grp_a_1: bracket.grp_a_1,
        grp_a_2: bracket.grp_a_2,
        grp_b_1: bracket.grp_b_1,
        grp_b_2: bracket.grp_b_2,
        grp_c_1: bracket.grp_c_1,
        grp_c_2: bracket.grp_c_2,
        grp_d_1: bracket.grp_d_1,
        grp_d_2: bracket.grp_d_2,
        grp_e_1: bracket.grp_e_1,
        grp_e_2: bracket.grp_e_2,
        grp_f_1: bracket.grp_f_1,
        grp_f_2: bracket.grp_f_2,
        grp_g_1: bracket.grp_g_1,
        grp_g_2: bracket.grp_g_2,
        grp_h_1: bracket.grp_h_1,
        grp_h_2: bracket.grp_h_2,
        r16_1: bracket.r16_1,
        r16_2: bracket.r16_2,
        r16_3: bracket.r16_3,
        r16_4: bracket.r16_4,
        r16_5: bracket.r16_5,
        r16_6: bracket.r16_6,
        r16_7: bracket.r16_7,
        r16_8: bracket.r16_8,
        r8_1: bracket.r8_1,
        r8_2: bracket.r8_2,
        r8_3: bracket.r8_3,
        r8_4: bracket.r8_4,
        r4_1: bracket.r4_1,
        r4_2: bracket.r4_2,
        r2_1: bracket.r2_1,
        r2_2: bracket.r2_2,
     	}
    }
   	// Otherwise do not update state
    return null;
  }

  // When component mounts fetch initial data
  componentDidMount () {
    const { authedUser, id } = this.props
    if (authedUser.id !== '') {
      if (!id) {
        this.props.dispatch(handleFetchBracket())
      }
      this.setState(() => ({
        page: 1,
      }))
    }
  }

  allowDrop = (ev) => {
    ev.preventDefault();
  }

  drag = (ev) => {
    ev.dataTransfer.setData('text', ev.target.id);
    const id = ev.target.id
    this.setState(() => ({
      transfering: id,
    }))
  }

  drop = (ev) => {
    ev.preventDefault()
    const { grp_a_1, grp_a_2, grp_b_1, grp_b_2, grp_c_1, grp_c_2,
      grp_d_1, grp_d_2, grp_e_1, grp_e_2, grp_f_1, grp_f_2, grp_g_1, grp_g_2,
      grp_h_1, grp_h_2, r16_1, r16_2, r16_3, r16_4, r16_5, r16_6, r16_7, r16_8,
      r8_1, r8_2, r8_3, r8_4, r4_1, r4_2, r2_1, r2_2, page
    } = this.state
    let data
    if (ev.target.getAttribute("draggable") === "true") {
      data = ev.dataTransfer.dropEffect = "none"; // dropping is not allowed
      this.setState(() => ({
        transfering: '',
      }))
      return
    }
    else {
      data = ev.dataTransfer.getData('text');
      // ev.dataTransfer.dropEffect = "all"; // drop it like it's hot
    }
    ev.target.appendChild(document.getElementById(data));
    const pg1 = ['grp_a_1', 'grp_a_2', 'grp_b_1', 'grp_b_2', 'grp_c_1',
    'grp_c_2', 'grp_d_1', 'grp_d_2', 'grp_e_1', 'grp_e_2', 'grp_f_1',
    'grp_f_2', 'grp_g_1', 'grp_g_2', 'grp_h_1', 'grp_h_2']
    const pg2 = ['r16_1', 'r16_2', 'r16_3', 'r16_4', 'r16_5', 'r16_6',
      'r16_7', 'r16_8'
    ]
    const pg3 = ['r8_1', 'r8_2', 'r8_3', 'r8_4']
    const pg4 = ['r4_1', 'r4_2']
    const pg5 = ['r2_1', 'r2_2']
    const pg1Picks = [grp_a_1, grp_a_2, grp_b_1, grp_b_2, grp_c_1, grp_c_2,
      grp_d_1, grp_d_2, grp_e_1, grp_e_2, grp_f_1, grp_f_2, grp_g_1, grp_g_2, grp_h_1,
      grp_h_2,
    ]
    const pg2Picks = [r16_1, r16_2, r16_3, r16_4, r16_5, r16_6, r16_7, r16_8]
    const pg3Picks = [r8_1, r8_2, r8_3, r8_4]
    const pg4Picks = [r4_1, r4_2]
    const pg5Picks = [r2_1, r2_2]

    if (page === 1) {
      if(!pg1.includes(ev.target.id)) {
        for (let i = 0; i < pg1Picks.length; i++) {
          if (data === pg1Picks[i]) {
            this.setState(() => ({
              transfering: '',
              [pg1[i]]: '',
            }))
          }
        }
      } else {
        for (let i = 0; i < pg1.length; i++) {
          if (ev.target.id === pg1[i]) {
            this.setState(() => ({
              transfering: '',
              [pg1[i]]: data,
              [`${pg1[i]}Changed`]: true,
            }))
          }
        }
      }
    }

    if (page === 2) {
      if(!pg2.includes(ev.target.id)) {
        for (let i = 0; i < pg2Picks.length; i++) {
          if (data === pg2Picks[i]) {
            this.setState(() => ({
              transfering: '',
              [pg2[i]]: '',
            }))
          }
        }
      } else {
        for (let i = 0; i < pg2.length; i++) {
          if (ev.target.id === pg2[i]) {
            this.setState(() => ({
              transfering: '',
              [pg2[i]]: data,
              [`${pg2[i]}Changed`]: true,
            }))
          }
        }
      }
    }

    if (page === 3) {
      if(!pg3.includes(ev.target.id)) {
        for (let i = 0; i < pg3Picks.length; i++) {
          if (data === pg3Picks[i]) {
            this.setState(() => ({
              transfering: '',
              [pg3[i]]: '',
            }))
          }
        }
      } else {
        for (let i = 0; i < pg3.length; i++) {
          if (ev.target.id === pg3[i]) {
            this.setState(() => ({
              transfering: '',
              [pg3[i]]: data,
              [`${pg3[i]}Changed`]: true,
            }))
          }
        }
      }
    }

    if (page === 4) {
      if(!pg4.includes(ev.target.id)) {
        for (let i = 0; i < pg4Picks.length; i++) {
          if (data === pg4Picks[i]) {
            this.setState(() => ({
              transfering: '',
              [pg4[i]]: '',
            }))
          }
        }
      } else {
        for (let i = 0; i < pg4.length; i++) {
          if (ev.target.id === pg4[i]) {
            this.setState(() => ({
              transfering: '',
              [pg4[i]]: data,
              [`${pg4[i]}Changed`]: true,
            }))
          }
        }
      }
    }

    if (page === 5) {
      if(!pg5.includes(ev.target.id)) {
        for (let i = 0; i < pg5Picks.length; i++) {
          if (data === pg5Picks[i]) {
            this.setState(() => ({
              transfering: '',
              [pg5[i]]: '',
            }))
          }
        }
      } else {
        for (let i = 0; i < pg5.length; i++) {
          if (ev.target.id === pg5[i]) {
            this.setState(() => ({
              transfering: '',
              [pg5[i]]: data,
              [`${pg5[i]}Changed`]: true,
            }))
          }
        }
      }
    }
  }
  handleHome = () => {
    this.setState({
      page: 1,
    })
  }
  handleClick = () => {
    const { grp_a_1, grp_a_2, grp_b_1, grp_b_2, grp_c_1, grp_c_2, grp_d_1,
      grp_d_2, grp_e_1, grp_e_2, grp_f_1, grp_f_2, grp_g_1, grp_g_2, grp_h_1,
      grp_h_2
    } = this.state
    const { masterBracket } = this.props
    const picks = [grp_a_1, grp_a_2, grp_b_1, grp_b_2, grp_c_1, grp_c_2,
      grp_d_1, grp_e_1, grp_e_2, grp_f_1, grp_f_2, grp_g_1, grp_g_2, grp_h_1,
      grp_h_2
    ]

    const groupPicks = {
      grp_a_1: masterBracket.grp_a_1,
      grp_a_2: masterBracket.grp_a_2,
      grp_b_1: masterBracket.grp_b_1,
      grp_b_2: masterBracket.grp_b_2,
      grp_c_1: masterBracket.grp_c_1,
      grp_c_2: masterBracket.grp_c_2,
      grp_d_1: masterBracket.grp_d_1,
      grp_d_2: masterBracket.grp_d_2,
      grp_e_1: masterBracket.grp_e_1,
      grp_e_2: masterBracket.grp_e_2,
      grp_f_1: masterBracket.grp_f_1,
      grp_f_2: masterBracket.grp_f_2,
      grp_g_1: masterBracket.grp_g_1,
      grp_g_2: masterBracket.grp_g_2,
      grp_h_1: masterBracket.grp_h_1,
      grp_h_2: masterBracket.grp_h_2,
    }
    if (!picks.includes('')) {
      this.setState(() => ({
        page: 2,
        groupPicks,
      }))
      window.scrollTo(0, 0)
    }
  }
  handleClick2 = () => {
    const { r16_1, r16_2, r16_3, r16_4, r16_5, r16_6, r16_7, r16_8
    } = this.state
    const picks = [r16_1, r16_2, r16_3, r16_4, r16_5, r16_6, r16_7, r16_8]

    const r16Picks = {
      r16_1, r16_2, r16_3, r16_4, r16_5, r16_6, r16_7, r16_8
    }
    if (!picks.includes('')) {
      this.setState(() => ({
        page: 3,
        r16Picks,
      }))
      window.scrollTo(0, 0)
    }
  }
  handleClick3 = () => {
    const { r8_1, r8_2, r8_3, r8_4 } = this.state
    const picks = [r8_1, r8_2, r8_3, r8_4]

    const r8Picks = {
      r8_1, r8_2, r8_3, r8_4
    }
    if (!picks.includes('')) {
      this.setState(() => ({
        page: 4,
        r8Picks,
      }))
      window.scrollTo(0, 0)
    }
  }
  handleClick4 = () => {
    const { r4_1, r4_2 } = this.state
    const picks = [r4_1, r4_2]

    const r4Picks = {
      r4_1, r4_2
    }
    if (!picks.includes('')) {
      this.setState(() => ({
        page: 5,
        r4Picks,
      }))
      window.scrollTo(0, 0)
    }
  }
  prevPage = () => {
    this.setState((prevState) => ({
      page: prevState.page - 1
    }))
  }
  showSubmit = () => {
    const { bracket } = this.state

    if (bracket.r16_1 === null || bracket.r16_2 === null ||
      bracket.r16_3 === null || bracket.r16_4 === null ||
      bracket.r16_5 === null || bracket.r16_6 === null ||
      bracket.r16_7 === null || bracket.r16_8 === null ||
      bracket.r8_1 === null || bracket.r8_2 === null ||
      bracket.r8_3 === null || bracket.r8_4 === null ||
      bracket.r4_1 === null || bracket.r4_2 === null ||
      bracket.r2_1 === null || bracket.r2_2 === null ||
      bracket.r16_1 === 0 || bracket.r16_2 === 0 ||
      bracket.r16_3 === 0 || bracket.r16_4 === 0 ||
      bracket.r16_5 === 0 || bracket.r16_6 === 0 ||
      bracket.r16_7 === 0 || bracket.r16_8 === 0 ||
      bracket.r8_1 === 0 || bracket.r8_2 === 0 ||
      bracket.r8_3 === 0 || bracket.r8_4 === 0 ||
      bracket.r4_1 === 0 || bracket.r4_2 === 0 ||
      bracket.r2_1 === 0 || bracket.r2_2 === 0
    ) {
      return true
    }
    return false
  }
  handleSubmit = () => {
    const { grp_a_1, grp_a_2, grp_b_1, grp_b_2, grp_c_1, grp_c_2, grp_d_1,
      grp_d_2, grp_e_1, grp_e_2, grp_f_1, grp_f_2, grp_g_1, grp_g_2, grp_h_1,
      grp_h_2, r16_1, r16_2, r16_3, r16_4, r16_5, r16_6, r16_7, r16_8,
      r8_1, r8_2, r8_3, r8_4, r4_1, r4_2, r2_1, r2_2
    } = this.state
    const { dispatch, authedUser, id } = this.props
    const bracket = {
      grp_a_1,
      grp_a_2,
      grp_b_1,
      grp_b_2,
      grp_c_1,
      grp_c_2,
      grp_d_1,
      grp_d_2,
      grp_e_1,
      grp_e_2,
      grp_f_1,
      grp_f_2,
      grp_g_1,
      grp_g_2,
      grp_h_1,
      grp_h_2,
      r16_1,
      r16_2,
      r16_3,
      r16_4,
      r16_5,
      r16_6,
      r16_7,
      r16_8,
      r8_1,
      r8_2,
      r8_3,
      r8_4,
      r4_1,
      r4_2,
      r2_1,
      r2_2
    }
    if (!authedUser.id) {
      dispatch(storeBracket(bracket))
      this.setState(() => ({
        toSignup: true,
      }))
    } else {
      dispatch(handleAddBracket(bracket))
      this.setState(() => ({
        page: 1,
      }))
    }
  }
  editBracket = () => {
    const { id, grp_a_1, grp_a_2, grp_b_1, grp_b_2, grp_c_1, grp_c_2, grp_d_1,
      grp_d_2, grp_e_1, grp_e_2, grp_f_1, grp_f_2, grp_g_1, grp_g_2, grp_h_1,
      grp_h_2, r16_1, r16_2, r16_3, r16_4, r16_5, r16_6, r16_7, r16_8,
      r8_1, r8_2, r8_3, r8_4, r4_1, r4_2, r2_1, r2_2
    } = this.state
    const { dispatch, authedUser } = this.props
    const bracket = {
      id,
      grp_a_1,
      grp_a_2,
      grp_b_1,
      grp_b_2,
      grp_c_1,
      grp_c_2,
      grp_d_1,
      grp_d_2,
      grp_e_1,
      grp_e_2,
      grp_f_1,
      grp_f_2,
      grp_g_1,
      grp_g_2,
      grp_h_1,
      grp_h_2,
      r16_1,
      r16_2,
      r16_3,
      r16_4,
      r16_5,
      r16_6,
      r16_7,
      r16_8,
      r8_1,
      r8_2,
      r8_3,
      r8_4,
      r4_1,
      r4_2,
      r2_1,
      r2_2
    }
    dispatch(handleEditBracket(bracket))
    this.setState(() => ({
      page: 1,
    }))
  }
  render () {
    const { grp_a_1, grp_a_2, grp_b_1, grp_b_2, grp_c_1, grp_c_2, grp_d_1,
      grp_d_2, grp_e_1, grp_e_2, grp_f_1, grp_f_2, grp_g_1, grp_g_2, grp_h_1,
      grp_h_2, r16_1, r16_2, r16_3, r16_4, r16_5, r16_6, r16_7, r16_8,
      r8_1, r8_2, r8_3, r8_4, r4_1, r4_2, r2_1, r2_2, page, groupPicks,
      r16Picks, r8Picks, r4Picks, bracket, toSignup, transfering
    } = this.state
    const { groupAIds, groupBIds, groupCIds, groupDIds, groupEIds, groupFIds,
      groupGIds, groupHIds, successMessage, errorMessage, name
    } = this.props
    if (toSignup === true) {
      return <Redirect to='/signup' />
    }
    const picks = {
      grp_a_1,
      grp_a_2,
      grp_b_1,
      grp_b_2,
      grp_c_1,
      grp_c_2,
      grp_d_1,
      grp_d_2,
      grp_e_1,
      grp_e_2,
      grp_f_1,
      grp_f_2,
      grp_g_1,
      grp_g_2,
      grp_h_1,
      grp_h_2,
      r16_1,
      r16_2,
      r16_3,
      r16_4,
      r16_5,
      r16_6,
      r16_7,
      r16_8,
      r8_1,
      r8_2,
      r8_3,
      r8_4,
      r4_1,
      r4_2,
      r2_1,
      r2_2
    }

    // if(bracket.grp_a_1 === 0) {
    //   return <div><NavTabs path='/' /></div>
    // }
    if (page === 1) {
      return (
        <div>
          <NavTabs path='/' />
          <div className='container pg-margin'>
            {name !== undefined
              ? <h4>{`${name}'s Bracket`}</h4>
              : <p className='mt-4 pm-dark'>
                  Pick the two teams that you think will advance from each
                  group by dragging and dropping the flags.
                </p>
            }
            <nav className="nav nav-pills nav-justified">
              <li className={page === 1 ? 'nav-link active' : 'nav-link'} onClick={this.handleHome} >Group Stage</li>
              <li className={page === 2 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick} >Round of 16</li>
              <li className={page === 3 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick2} >Quarterfinal</li>
              <li className={page === 4 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick3} >Semifinal</li>
              <li className={page === 5 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick4} >Final</li>
            </nav>
            <div className='mb-4' />
            <BracketGroup
              group='A'
              groupIds={groupAIds}
              picks={picks}
              allowDrop={this.allowDrop}
              drag={this.drag}
              drop={this.drop}
              bracket={bracket}
            />
            <BracketGroup
              group='B'
              groupIds={groupBIds}
              picks={picks}
              allowDrop={this.allowDrop}
              drag={this.drag}
              drop={this.drop}
              bracket={bracket}
            />
            <BracketGroup
              group='C'
              groupIds={groupCIds}
              picks={picks}
              allowDrop={this.allowDrop}
              drag={this.drag}
              drop={this.drop}
              bracket={bracket}
            />
            <BracketGroup
              group='D'
              groupIds={groupDIds}
              picks={picks}
              allowDrop={this.allowDrop}
              drag={this.drag}
              drop={this.drop}
              bracket={bracket}
            />
            <BracketGroup
              group='E'
              groupIds={groupEIds}
              picks={picks}
              allowDrop={this.allowDrop}
              drag={this.drag}
              drop={this.drop}
              bracket={bracket}
            />
            <BracketGroup
              group='F'
              groupIds={groupFIds}
              picks={picks}
              allowDrop={this.allowDrop}
              drag={this.drag}
              drop={this.drop}
              bracket={bracket}
            />
            <BracketGroup
              group='G'
              groupIds={groupGIds}
              picks={picks}
              allowDrop={this.allowDrop}
              drag={this.drag}
              drop={this.drop}
              bracket={bracket}
            />
            <BracketGroup
              group='H'
              groupIds={groupHIds}
              picks={picks}
              allowDrop={this.allowDrop}
              drag={this.drag}
              drop={this.drop}
              bracket={bracket}
            />
            {Object.keys(bracket).length === 0 || bracket.id === 1
              ? <p>Group stage bracket has been closed</p>
              : <button className='btn btn-primary mb-4' onClick={this.handleClick}>
                  Continue
                </button>
            }
            {successMessage && <FetchSuccess message={successMessage} />}
            {errorMessage && <FetchError message={errorMessage} />}
          </div>
        </div>
  		)
    }
    const r16Games = ['r16_1', 'r16_2', 'r16_3', 'r16_4', 'r16_5', 'r16_6',
      'r16_7', 'r16_8'
    ]
    const r8Games = ['r8_1', 'r8_2', 'r8_3', 'r8_4']
    const r4Games = ['r4_1', 'r4_2']
    const r2Games = ['r2_1', 'r2_2']

    const showGames = (game, index) => {
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
				pick2 = groupPicks.grp_d_2
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
    		pick1 = r16Picks.r16_1
    		pick2 = r16Picks.r16_2
    		pick = picks.r8_1
    	}
    	if (game === 'r8_2') {
    		game1 = 'r16_3'
    		game2 = 'r16_4'
    		pick1 = r16Picks.r16_3
    		pick2 = r16Picks.r16_4
    		pick = picks.r8_2
    	}
    	if (game === 'r8_3') {
    		game1 = 'r16_5'
    		game2 = 'r16_6'
    		pick1 = r16Picks.r16_5
    		pick2 = r16Picks.r16_6
    		pick = picks.r8_3
    	}
    	if (game === 'r8_4') {
    		game1 = 'r16_7'
    		game2 = 'r16_8'
    		pick1 = r16Picks.r16_7
    		pick2 = r16Picks.r16_8
    		pick = picks.r8_4
    	}
    	if (game === 'r4_1') {
    		game1 = 'r8_1'
    		game2 = 'r8_2'
    		pick1 = r8Picks.r8_1
    		pick2 = r8Picks.r8_2
    		pick = picks.r4_1
    	}
    	if (game === 'r4_2') {
    		game1 = 'r8_3'
    		game2 = 'r8_4'
    		pick1 = r8Picks.r8_3
    		pick2 = r8Picks.r8_4
    		pick = picks.r4_2
    	}
    	if (game === 'r2_1') {
    		game1 = 'r4_1'
    		game2 = 'r4_2'
    		pick1 = r4Picks.r4_1
    		pick2 = r4Picks.r4_2
    		pick = picks.r2_1
    	}
    	if (game === 'r2_2') {
    		if (r8Picks.r8_1 === r4Picks.r4_1) {
    			game1 = 'r8_2'
    			pick1 = r8Picks.r8_2
    		} else {
    			game1 = 'r8_1'
    			pick1 = r8Picks.r8_1
    		}
    		if (r8Picks.r8_3 === r4Picks.r4_2) {
    			game2 = 'r8_4'
    			pick2 = r8Picks.r8_4
    		} else {
    			game2 = 'r8_3'
    			pick2 = r8Picks.r8_3
    		}
    		pick = picks.r2_2
    	}
			return (
				<li key={index}>
          {game === 'r2_1' &&
            <p>Final</p>
          }
          {game === 'r2_2' &&
            <p>Third Place</p>
          }
          {game !== 'r2_1' && game !== 'r2_2'
            && <p>{`Match ${index + 1}`}</p>
          }
					<div className='ml-4 mt-4 mb-4 d-flex align-items-center'>
						<div>
              {this.showSubmit() === false
                ? <Fragment>
                    <BracketTeam
                      key={`${game1}-${game}`}
                      id={pick1}
                      game={game}
                      pgame={game1}
                      bracket='nodrag'
                    />
                    <BracketTeam
                      key={`${game2}-${game}`}
                      id={pick2}
                      game={game}
                      pgame={game2}
                      bracket='nodrag'
                    />
                  </Fragment>
                : <Fragment>
                    <BracketTeam
                      key={`${game1}-${game}`}
                      id={pick1}
                      allowDrop={this.allowDrop}
                      drop={this.drop}
                      drag={this.drag}
                      game={game}
                      pgame={game1}
                    />
                    <BracketTeam
                      key={`${game2}-${game}`}
                      id={pick2}
                      allowDrop={this.allowDrop}
                      drop={this.drop}
                      drag={this.drag}
                      game={game}
                      pgame={game2}
                    />
                  </Fragment>
              }
						</div>
						<div className='pick-container d-flex align-items-center'>
              {this.showSubmit() === false
                ? <Fragment>
                    <div
                      key={game}
                      id={game}
                      className='flag-container'
                    >
                      <BracketTeam key={pick} id={pick} bracket='img' />
                    </div>
                    <BrTeamName id={pick} />
                  </Fragment>
                : <Fragment>
                    <div
                      key={game}
                      id={game}
                      className='flag-container'
                      onDrop={this.drop}
                      onDragOver={this.allowDrop}
                    >
                    </div>
                    <BrTeamName id={pick} />
                  </Fragment>
              }
						</div>
					</div>
				</li>
			)
		}

    if (page === 2) {
      return (
        <div>
          <NavTabs path='/' />
          <div className='container pg-margin'>
            {name !== undefined
              ? <h4>{`${name}'s Bracket`}</h4>
              : <p className='mt-4 pm-dark'>
                  Pick the two teams that you think will advance from the
                  round by dragging and dropping the flags.
                </p>
            }
            <nav className="nav nav-pills nav-justified">
              <li className={page === 1 ? 'nav-link active' : 'nav-link'} onClick={this.handleHome} >Group Stage</li>
              <li className={page === 2 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick} >Round of 16</li>
              <li className={page === 3 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick2} >Quarterfinal</li>
              <li className={page === 4 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick3} >Semifinal</li>
              <li className={page === 5 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick4} >Final</li>
            </nav>
            <div className='mb-4' />
            <ul>
  						{r16Games.map((game, index) => showGames(game, index))}
  					</ul>
            <button className='btn btn-primary mb-4' onClick={this.handleClick2}>
              Continue
            </button>
          </div>
        </div>
      )
    }
    if (page === 3) {
      return (
        <div>
          <NavTabs path='/' />
          <div className='container pg-margin'>
            {name !== undefined
              ? <h4>{`${name}'s Bracket`}</h4>
              : <p className='mt-4 pm-dark'>
                  Pick the two teams that you think will advance from each
                  group by dragging and dropping the flags.
                </p>
            }
            <nav className="nav nav-pills nav-justified">
              <li className={page === 1 ? 'nav-link active' : 'nav-link'} onClick={this.handleHome} >Group Stage</li>
              <li className={page === 2 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick} >Round of 16</li>
              <li className={page === 3 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick2} >Quarterfinal</li>
              <li className={page === 4 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick3} >Semifinal</li>
              <li className={page === 5 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick4} >Final</li>
            </nav>
            <div className='mb-4' />
            <ul>
  						{r8Games.map((game, index) => showGames(game, index))}
  					</ul>
            <button className='btn btn-primary mb-4' onClick={this.handleClick3}>
              Continue
            </button>
          </div>
        </div>
      )
    }
    if (page === 4) {
      return (
        <div>
          <NavTabs path='/' />
          <div className='container pg-margin'>
            {name !== undefined
              ? <h4>{`${name}'s Bracket`}</h4>
              : <p className='mt-4 pm-dark'>
                  Pick the two teams that you think will advance from each
                  group by dragging and dropping the flags.
                </p>
            }
            <nav className="nav nav-pills nav-justified">
              <li className={page === 1 ? 'nav-link active' : 'nav-link'} onClick={this.handleHome} >Group Stage</li>
              <li className={page === 2 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick} >Round of 16</li>
              <li className={page === 3 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick2} >Quarterfinal</li>
              <li className={page === 4 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick3} >Semifinal</li>
              <li className={page === 5 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick4} >Final</li>
            </nav>
            <div className='mb-4' />
            <ul>
  						{r4Games.map((game, index) => showGames(game, index))}
  					</ul>
            <button className='btn btn-primary mb-4' onClick={this.handleClick4}>
              Continue
            </button>
          </div>
        </div>
      )
    }
    return (
      <div>
        <NavTabs path='/' />
        <div className='container pg-margin'>
          {name !== undefined
            ? <h4>{`${name}'s Bracket`}</h4>
            : <p className='mt-4 pm-dark'>
                Pick the two teams that you think will advance from each
                group by dragging and dropping the flags.
              </p>
          }
          <nav className="nav nav-pills nav-justified">
            <li className={page === 1 ? 'nav-link active' : 'nav-link'} onClick={this.handleHome} >Group Stage</li>
            <li className={page === 2 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick} >Round of 16</li>
            <li className={page === 3 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick2} >Quarterfinal</li>
            <li className={page === 4 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick3} >Semifinal</li>
            <li className={page === 5 ? 'nav-link active' : 'nav-link'} onClick={this.handleClick4} >Final</li>
          </nav>
          <div className='mb-4' />
          <ul>
            {r2Games.map((game, index) => showGames(game, index))}
          </ul>
          {this.showSubmit() === true
            ? <p>Bracket submissions have been closed</p>
            : <div className='pm-dark'>Bracket submitted</div>
          }
          {successMessage && <FetchSuccess message={successMessage} />}
          {errorMessage && <FetchError message={errorMessage} />}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ teams, brackets, authedUser, users, successMessage, errorMessage }, props) {
  let bracket
  let uName
  let uid
  let masterBracket = {}
	if (Object.keys(brackets).length > 0) {
		masterBracket = brackets[1]
	}
  if (props.match) {
    const { id } = props.match.params
    uid = id
  }

  if (authedUser.id !== '') {
    let bracketId
    if (uid) {
      const user = users[uid]
      bracketId = user.bracket
      uName = user.name
    }
    if (props.id) {
      const user = users[props.id]
      bracketId = user.bracket
      uName = user.name
    }
    bracket = brackets[bracketId]
  }

  return {
    groupAIds: Object.keys(teams)
      .filter((a) => teams[a].group.includes('A'))
      .sort((a,b) => teams[b].Pts - teams[a].Pts),
    groupBIds: Object.keys(teams)
      .filter((a) => teams[a].group.includes('B'))
      .sort((a,b) => teams[b].Pts - teams[a].Pts),
    groupCIds: Object.keys(teams)
      .filter((a) => teams[a].group.includes('C'))
      .sort((a,b) => teams[b].Pts - teams[a].Pts),
    groupDIds: Object.keys(teams)
      .filter((a) => teams[a].group.includes('D'))
      .sort((a,b) => teams[b].Pts - teams[a].Pts),
    groupEIds: Object.keys(teams)
      .filter((a) => teams[a].group.includes('E'))
      .sort((a,b) => teams[b].Pts - teams[a].Pts),
    groupFIds: Object.keys(teams)
      .filter((a) => teams[a].group.includes('F'))
      .sort((a,b) => teams[b].Pts - teams[a].Pts),
    groupGIds: Object.keys(teams)
      .filter((a) => teams[a].group.includes('G'))
      .sort((a,b) => teams[b].Pts - teams[a].Pts),
    groupHIds: Object.keys(teams)
      .filter((a) => teams[a].group.includes('H'))
      .sort((a,b) => teams[b].Pts - teams[a].Pts),
    masterBracket,
    bracket,
    authedUser,
    name: uName,
  }
}

export default connect(mapStateToProps)(Bracket)
