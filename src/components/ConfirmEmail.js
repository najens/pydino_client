import React, { Component } from "react"
import { connect } from 'react-redux'
import { handleConfirmEmail } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'


class ConfirmEmail extends Component {
    componentDidMount () {
        const { dispatch } = this.props
        const url = window.location.href
        const urlArray = url.split('?token=')
        const token = urlArray[1]
        if (token) {
            console.log("TOKEN: ", token)
            dispatch(handleConfirmEmail(token))
        }
    }

    render () {
        const { authedUser } = this.props

        if (authedUser.id !== '') {
            return <Redirect to='/' />
        }

        return null
    }
}

const mapStateToProps = ({ authedUser, isFetching, errorMessage, successMessage }) => ({
    authedUser,
    isFetching,
    errorMessage,
    successMessage,
})

export default connect(mapStateToProps)(ConfirmEmail);
