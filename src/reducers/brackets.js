import { FETCH_BRACKETS_SUCCESS, STORE_BRACKET, FETCH_ADD_BRACKET_SUCCESS,
	FETCH_EDIT_BRACKET_SUCCESS, FETCH_DELETE_BRACKET_SUCCESS,
} from '../actions/brackets'

/**
 * Updates users state in store each
 * time an action in switch case is called
 *
 * @param {Object} state - brackets
 * @param {Object} action
 * @return {Object} state - new brackets
 */
export default function brackets (state = {}, action) {
  switch(action.type) {
    case FETCH_BRACKETS_SUCCESS :
			const scoredBrackets = addScoreToBrackets(action.brackets)
			const rankedBrackets = addRankToBrackets(scoredBrackets)
      return {
        ...state,
        ...rankedBrackets
      }
    case FETCH_ADD_BRACKET_SUCCESS :
    case FETCH_EDIT_BRACKET_SUCCESS :
			delete state.unauthed
      return {
        ...state,
        [action.bracket.id]: action.bracket,
      }
		case STORE_BRACKET :
			return {
				...state,
				['unauthed']: action.bracket
			}
		case FETCH_DELETE_BRACKET_SUCCESS :
			delete state[action.id]
			return {
				...state
			}
    default :
      return state
  }
}

const addScoreToBrackets = (brackets) => {
	const scoredBrackets = {}
	const masterBracket = brackets[1]
	Object.keys(brackets).map((a) => {
		let bracket = brackets[a]
		if (bracket.id !== 1) {
			let scores = calculateScore(bracket, masterBracket)
			bracket.score = scores.userScore
			bracket.ppr = scores.ppr
		}
		scoredBrackets[a] = bracket
	})
	return scoredBrackets
}

const addRankToBrackets = (scoredBrackets) => {
	const rankedBrackets = {}
	let prevRank = 0
	let prevScore = 0
	let item = 1
	Object.keys(scoredBrackets)
		.sort((a,b) => scoredBrackets[b].score - scoredBrackets[a].score)
		.map(a => {
			let bracket = scoredBrackets[a]
			let rank
			if (bracket !== scoredBrackets[1]) {
				if (bracket.score === prevScore) {
					rank = prevRank
					item += 1
				} else {
					prevScore = bracket.score
					prevRank = item
					rank = prevRank
					item += 1
				}
				bracket.rank = rank
			}
			rankedBrackets[a] = bracket
		})
	return rankedBrackets
}

const calculateScore = (bracket, masterBracket) => {
	let userScore = 0
	let ppr = 880
	let ppr8_1 = false
	let ppr8_2 = false
	let ppr8_3 = false
	let ppr8_4 = false
	let ppr4_1 = false
	let ppr4_2 = false
	let ppr2_1 = false
	let ppr2_2 = false
	const scores = {}
	const groupScoring = (grpPick1, grpPick2, grpMasterPick1, grpMasterPick2) => {
		if (grpMasterPick1 !== 0) {
			ppr -= 10
		}
		if (grpMasterPick2 !== 0) {
			ppr -= 10
		}
		if (grpPick1 === grpMasterPick1) {
			userScore += 10
		}
		if (grpPick2 === grpMasterPick2) {
			userScore += 10
		}
		if (grpPick1 === grpMasterPick2) {
			userScore += 5
		}
		if (grpPick2 === grpMasterPick1) {
			userScore += 5
		}
	}

	const r16Scoring = (r16pick, r8pick, r4pick, r2pick1, r2pick2, r16masterPick, game) => {
		if (r16masterPick !== 0) {
			if (r16pick === r16masterPick) {
				userScore += 20
				ppr -= 20
			}
			if (r16pick !== r16masterPick) {
				ppr -= 20

				if (game === 'g16_1' || game === 'g16_2') {
					if (r16pick === r8pick) {
						ppr -= 40
						ppr8_1 = true
					}
					if (r16pick === r4pick) {
						ppr -= 80
						ppr4_1 = true
					}
				}

				if (game === 'g16_3' || game === 'g16_4') {
					if (r16pick === r8pick) {
						ppr -= 40
						ppr8_2 = true
					}
					if (r16pick === r4pick) {
						ppr -= 80
						ppr4_1 = true
					}
				}

				if (game === 'g16_5' || game === 'g16_6') {
					if (r16pick === r8pick) {
						ppr -= 40
						ppr8_3 = true
					}
					if (r16pick === r4pick) {
						ppr -= 80
						ppr4_2 = true
					}
				}

				if (game === 'g16_7' || game === 'g16_8') {
					if (r16pick === r8pick) {
						ppr -= 40
						ppr8_4 = true
					}
					if (r16pick === r4pick) {
						ppr -= 80
						ppr4_2 = true
					}
				}

				if (r16pick === r2pick1) {
					ppr -= 160
					ppr2_1 = true
				}
				if (r16pick === r2pick2) {
					ppr -= 80
					ppr2_2 = true
				}
			}
		}
	}

	const r8Scoring = (r8pick, r4pick, r2pick1, r2pick2, r8masterPick, ppr8, ppr4, ppr21, ppr22, game) => {
		if (r8masterPick !== 0) {
			if (r8pick === r8masterPick) {
				userScore += 40
				ppr -= 40
			}

			if (game === 'g8_1') {
				if (r8pick !== r8masterPick) {
					if (ppr8 !== true) {
						ppr -= 40
						ppr8_1 = true
					}
					if (r8pick === r4pick && ppr4 !== true) {
						ppr -= 80
						ppr4_1 = true
					}
					if (r8pick === r2pick1 && ppr21 !== true) {
						ppr -= 160
						ppr2_1 = true
					}
					if (r8pick === r2pick2 && ppr22 !== true) {
						ppr -= 80
						ppr2_2 = true
					}
				}
			}

			if (game === 'g8_2') {
				if (r8pick !== r8masterPick) {
					if (ppr8 !== true) {
						ppr -= 40
						ppr8_2 = true
					}
					if (r8pick === r4pick && ppr4 !== true) {
						ppr -= 80
						ppr4_1 = true
					}
					if (r8pick === r2pick1 && ppr21 !== true) {
						ppr -= 160
						ppr2_1 = true
					}
					if (r8pick === r2pick2 && ppr22 !== true) {
						ppr -= 80
						ppr2_2 = true
					}
				}
			}

			if (game === 'g8_3') {
				if (r8pick !== r8masterPick) {
					if (ppr8 !== true) {
						ppr -= 40
						ppr8_3 = true
					}
					if (r8pick === r4pick && ppr4 !== true) {
						ppr -= 80
						ppr4_2 = true
					}
					if (r8pick === r2pick1 && ppr21 !== true) {
						ppr -= 160
						ppr2_1 = true
					}
					if (r8pick === r2pick2 && ppr22 !== true) {
						ppr -= 80
						ppr2_2 = true
					}
				}
			}

			if (game === 'g8_4') {
				if (r8pick !== r8masterPick) {
					if (ppr8 !== true) {
						ppr -= 40
						ppr8_4 = true
					}
					if (r8pick === r4pick && ppr4 !== true) {
						ppr -= 80
						ppr4_2 = true
					}
					if (r8pick === r2pick1 && ppr21 !== true) {
						ppr -= 160
						ppr2_1 = true
					}
					if (r8pick === r2pick2 && ppr22 !== true) {
						ppr -= 80
						ppr2_2 = true
					}
				}
			}

		}
	}

	const r4Scoring = (r4pick, r2pick1, r2pick2, r4masterPick, ppr4, ppr21, ppr22, game) => {
		if (r4masterPick !== 0) {
			if (r4pick === r4masterPick) {
				userScore += 80
				ppr -= 80
			}

			if (game === 'g4_1') {
				if (r4pick !== r4masterPick) {
					if (ppr4 !== true) {
						ppr -= 80
						ppr4_1 = true
					}
					if (r4pick === r2pick1 && ppr21 !== true) {
						ppr -= 160
						ppr2_1 = true
					}
					if (r4pick === r2pick2 && ppr22 !== true) {
						ppr -= 80
						ppr2_2 = true
					}
				}
			}

			if (game === 'g4_2') {
				if (r4pick !== r4masterPick) {
					if (ppr4 !== true) {
						ppr -= 80
						ppr4_2 = true
					}
					if (r4pick === r2pick1 && ppr21 !== true) {
						ppr -= 160
						ppr2_1 = true
					}
					if (r4pick === r2pick2 && ppr22 !== true) {
						ppr -= 80
						ppr2_2 = true
					}
				}
			}

		}
	}

	const r22Scoring = (r2pick2, r22masterPick, ppr22, game) => {
		if (r22masterPick !== 0) {
			if (r2pick2 === r22masterPick) {
				userScore += 80
				ppr -= 80
			}
			if (game === 'g2_2') {
				if (r2pick2 !== r22masterPick && ppr22 !== true) {
					ppr -= 80
					ppr2_2 = true
				}
			}
		}
	}


	const r21Scoring = (r2pick1, r21masterPick, ppr21, game) => {
		if (r21masterPick !== 0) {
			if (r2pick1 === r21masterPick) {
				userScore += 160
				ppr -= 160
			}
			if (game === 'g2_1') {
				if (r2pick1 !== r21masterPick && ppr21 !== true) {
					ppr -= 160
					ppr2_1 = true
				}
			}
		}
	}
	groupScoring(bracket.grp_a_1, bracket.grp_a_2, masterBracket.grp_a_1,
		masterBracket.grp_a_2, 'g16_1')
	groupScoring(bracket.grp_b_1, bracket.grp_b_2, masterBracket.grp_b_1,
		masterBracket.grp_b_2, 'g16_2')
	groupScoring(bracket.grp_c_1, bracket.grp_c_2, masterBracket.grp_c_1,
		masterBracket.grp_c_2, 'g16_3')
	groupScoring(bracket.grp_d_1, bracket.grp_d_2, masterBracket.grp_d_1,
		masterBracket.grp_d_2, 'g16_4')
	groupScoring(bracket.grp_e_1, bracket.grp_e_2, masterBracket.grp_e_1,
		masterBracket.grp_e_2, 'g16_5')
	groupScoring(bracket.grp_f_1, bracket.grp_f_2, masterBracket.grp_f_1,
		masterBracket.grp_f_2, 'g16_6')
	groupScoring(bracket.grp_g_1, bracket.grp_g_2, masterBracket.grp_g_1,
		masterBracket.grp_g_2, 'g16_7')
	groupScoring(bracket.grp_h_1, bracket.grp_h_2, masterBracket.grp_h_1,
		masterBracket.grp_h_2, 'g16_8')

	r16Scoring(bracket.r16_1, bracket.r8_1, bracket.r4_1, bracket.r2_1,
		bracket.r2_2, masterBracket.r16_1)
	r16Scoring(bracket.r16_2, bracket.r8_1, bracket.r4_1, bracket.r2_1,
		bracket.r2_2, masterBracket.r16_2)
	r16Scoring(bracket.r16_3, bracket.r8_2, bracket.r4_1, bracket.r2_1,
		bracket.r2_2, masterBracket.r16_3)
	r16Scoring(bracket.r16_4, bracket.r8_2, bracket.r4_1, bracket.r2_1,
		bracket.r2_2, masterBracket.r16_4)
	r16Scoring(bracket.r16_5, bracket.r8_3, bracket.r4_2, bracket.r2_1,
		bracket.r2_2, masterBracket.r16_5)
	r16Scoring(bracket.r16_6, bracket.r8_3, bracket.r4_2, bracket.r2_1,
		bracket.r2_2, masterBracket.r16_6)
	r16Scoring(bracket.r16_7, bracket.r8_4, bracket.r4_2, bracket.r2_1,
		bracket.r2_2, masterBracket.r16_7)
	r16Scoring(bracket.r16_8, bracket.r8_4, bracket.r4_2, bracket.r2_1,
		bracket.r2_2, masterBracket.r16_8)

	r8Scoring(bracket.r8_1, bracket.r4_1, bracket.r2_1, bracket.r2_2,
		masterBracket.r8_1, ppr8_1, ppr4_1, ppr2_1, ppr2_2, 'g8_1')
	r8Scoring(bracket.r8_2, bracket.r4_1, bracket.r2_1, bracket.r2_2,
		masterBracket.r8_2, ppr8_2, ppr4_1, ppr2_1, ppr2_2, 'g8_2')
	r8Scoring(bracket.r8_3, bracket.r4_2, bracket.r2_1, bracket.r2_2,
		masterBracket.r8_3, ppr8_3, ppr4_2, ppr2_1, ppr2_2, 'g8_3')
	r8Scoring(bracket.r8_4, bracket.r4_2, bracket.r2_1, bracket.r2_2,
		masterBracket.r8_4, ppr8_4, ppr4_2, ppr2_1, ppr2_2, 'g8_4')

	r4Scoring(bracket.r4_1, bracket.r2_1, bracket.r2_2, masterBracket.r4_1,
		ppr4_1, ppr2_1, ppr2_2, 'g4_1')
	r4Scoring(bracket.r4_2, bracket.r2_1, bracket.r2_2, masterBracket.r4_2,
		ppr4_2, ppr2_1, ppr2_2, 'g4_2')

	if (bracket.r2_2 === 9 ) {
		ppr -= 80
		ppr2_2 = true
	}

	// if (bracket.r2_1 === 25) {
	// 	ppr -= 160
	// 	ppr2_1 = true
	// }

	r22Scoring(bracket.r2_2, masterBracket.r2_2, ppr2_2, 'g2_2')
	r21Scoring(bracket.r2_1, masterBracket.r2_1, ppr2_1, 'g2_1')
	if (!bracket.r16_1) {
		ppr = 0
	}

	scores.userScore = userScore
	scores.ppr = ppr
	return scores
}
