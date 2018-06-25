import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'drag-drop-touch'
import BracketGroup from './BracketGroup'
import Elimination from './Elimination'
import { handleFetchBracket, handleAddBracket, handleEditBracket, storeBracket } from '../../actions/brackets'
import { FaArrowLeft } from 'react-icons/lib/fa'
import FetchSuccess from '../FetchSuccess'
import FetchError from '../FetchError'
import { Redirect } from 'react-router-dom'
import NavTabs from './NavTabs'

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
  handleClick = () => {
    const { grp_a_1, grp_a_2, grp_b_1, grp_b_2, grp_c_1, grp_c_2, grp_d_1,
      grp_d_2, grp_e_1, grp_e_2, grp_f_1, grp_f_2, grp_g_1, grp_g_2, grp_h_1,
      grp_h_2
    } = this.state
    const picks = [grp_a_1, grp_a_2, grp_b_1, grp_b_2, grp_c_1, grp_c_2,
      grp_d_1, grp_e_1, grp_e_2, grp_f_1, grp_f_2, grp_g_1, grp_g_2, grp_h_1,
      grp_h_2
    ]

    const groupPicks = {
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
    if (authedUser.id) {
      dispatch(storeBracket(bracket))
      this.setState(() => ({
        toSignup: true,
      }))
    } else {
      dispatch(handleAddBracket(bracket))
    }
  }
  handleEditMaster = () => {
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
  }
  render () {
    const { grp_a_1, grp_a_2, grp_b_1, grp_b_2, grp_c_1, grp_c_2, grp_d_1,
      grp_d_2, grp_e_1, grp_e_2, grp_f_1, grp_f_2, grp_g_1, grp_g_2, grp_h_1,
      grp_h_2, r16_1, r16_2, r16_3, r16_4, r16_5, r16_6, r16_7, r16_8,
      r8_1, r8_2, r8_3, r8_4, r4_1, r4_2, r2_1, r2_2, page, groupPicks,
      r16Picks, r8Picks, r4Picks, bracket, toSignup
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
            <h4 className='text-left'>Group Stage</h4>
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
              ? <button
                  className='btn btn-primary mb-4'
                  onClick={bracket.id === 1 ? this.handleEditMaster : null}
                >
                  Submit
                </button>
              : <div className='pm-dark'>Bracket submitted</div>
            }
            {successMessage && <FetchSuccess message={successMessage} />}
            {errorMessage && <FetchError message={errorMessage} />}
          </div>
        </div>
  		)
    }
    if (page === 2) {
      return (
        <div>
          <FaArrowLeft className='d-flex back-arrow' onClick={this.prevPage} />
          <h4 className='text-left'>Round of 16</h4>
          <p>Match 1</p>
          <Elimination
            game='r16_1'
            groupPicks={groupPicks}
            picks={picks}
            allowDrop={this.allowDrop}
            drag={this.drag}
            drop={this.drop}
            bracket={bracket}
          />
          <p>Match 2</p>
          <Elimination
            game='r16_2'
            groupPicks={groupPicks}
            picks={picks}
            allowDrop={this.allowDrop}
            drag={this.drag}
            drop={this.drop}
            bracket={bracket}
          />
          <p>Match 3</p>
          <Elimination
            game='r16_3'
            groupPicks={groupPicks}
            picks={picks}
            allowDrop={this.allowDrop}
            drag={this.drag}
            drop={this.drop}
            bracket={bracket}
          />
          <p>Match 4</p>
          <Elimination
            game='r16_4'
            groupPicks={groupPicks}
            picks={picks}
            allowDrop={this.allowDrop}
            drag={this.drag}
            drop={this.drop}
            bracket={bracket}
          />
          <p>Match 5</p>
          <Elimination
            game='r16_5'
            groupPicks={groupPicks}
            picks={picks}
            allowDrop={this.allowDrop}
            drag={this.drag}
            drop={this.drop}
            bracket={bracket}
          />
          <p>Match 6</p>
          <Elimination
            game='r16_6'
            groupPicks={groupPicks}
            picks={picks}
            allowDrop={this.allowDrop}
            drag={this.drag}
            drop={this.drop}
            bracket={bracket}
          />
          <p>Match 7</p>
          <Elimination
            game='r16_7'
            groupPicks={groupPicks}
            picks={picks}
            allowDrop={this.allowDrop}
            drag={this.drag}
            drop={this.drop}
            bracket={bracket}
          />
          <p>Match 8</p>
          <Elimination
            game='r16_8'
            groupPicks={groupPicks}
            picks={picks}
            allowDrop={this.allowDrop}
            drag={this.drag}
            drop={this.drop}
            bracket={bracket}
          />
          <button className='btn btn-primary mb-4' onClick={this.handleClick2}>
            Continue
          </button>
        </div>
      )
    }
    if (page === 3) {
      return (
        <div>
          <FaArrowLeft className='d-flex back-arrow' onClick={this.prevPage} />
          <h4 className='text-left'>Quarter-finals</h4>
          <p>Match 1</p>
          <Elimination
            game='r8_1'
            groupPicks={r16Picks}
            picks={picks}
            allowDrop={this.allowDrop}
            drag={this.drag}
            drop={this.drop}
            bracket={bracket}
          />
          <p>Match 2</p>
          <Elimination
            game='r8_2'
            groupPicks={r16Picks}
            picks={picks}
            allowDrop={this.allowDrop}
            drag={this.drag}
            drop={this.drop}
            bracket={bracket}
          />
          <p>Match 3</p>
          <Elimination
            game='r8_3'
            groupPicks={r16Picks}
            picks={picks}
            allowDrop={this.allowDrop}
            drag={this.drag}
            drop={this.drop}
            bracket={bracket}
          />
          <p>Match 4</p>
          <Elimination
            game='r8_4'
            groupPicks={r16Picks}
            picks={picks}
            allowDrop={this.allowDrop}
            drag={this.drag}
            drop={this.drop}
            bracket={bracket}
          />
          <button className='btn btn-primary mb-4' onClick={this.handleClick3}>
            Continue
          </button>
        </div>
      )
    }
    if (page === 4) {
      return (
        <div>
          <FaArrowLeft className='d-flex back-arrow' onClick={this.prevPage} />
          <h4 className='text-left'>Semi-finals</h4>
          <p>Match 1</p>
          <Elimination
            game='r4_1'
            groupPicks={r8Picks}
            picks={picks}
            allowDrop={this.allowDrop}
            drag={this.drag}
            drop={this.drop}
            bracket={bracket}
          />
          <p>Match 2</p>
          <Elimination
            game='r4_2'
            groupPicks={r8Picks}
            picks={picks}
            allowDrop={this.allowDrop}
            drag={this.drag}
            drop={this.drop}
            bracket={bracket}
          />
          <button className='btn btn-primary mb-4' onClick={this.handleClick4}>
            Continue
          </button>
        </div>
      )
    }
    return (
      <div>
        <FaArrowLeft className='back-arrow d-flex' onClick={this.prevPage} />
        <h4 className='text-left'>Championship</h4>
        <p>Final</p>
        <Elimination
          game='r2_1'
          groupPicks={r4Picks}
          grpu2Picks={r8Picks}
          picks={picks}
          allowDrop={this.allowDrop}
          drag={this.drag}
          drop={this.drop}
          bracket={bracket}
        />
        <p>Third Place</p>
        <Elimination
          game='r2_2'
          groupPicks={r4Picks}
          group2Picks={r8Picks}
          picks={picks}
          allowDrop={this.allowDrop}
          drag={this.drag}
          drop={this.drop}
          bracket={bracket}
        />
        {Object.keys(bracket).length === 0
          ? <button className='btn btn-primary mb-4' onClick={this.handleSubmit}>
              Submit
            </button>
          : <div className='pm-dark'>Bracket submitted</div>
        }
        {successMessage && <FetchSuccess message={successMessage} />}
        {errorMessage && <FetchError message={errorMessage} />}

      </div>
    )
  }
}

function mapStateToProps ({ teams, brackets, authedUser, users, successMessage, errorMessage }, props) {
  let bracket
  let uName
  let uid
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
    bracket,
    authedUser,
    name: uName,
  }
}

export default connect(mapStateToProps)(Bracket)
