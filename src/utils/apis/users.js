import axios from 'axios'
import DOMAIN from './config'

// Url and API Endpoints
const API_ENDPOINT = DOMAIN + 'api/v1/'
const USER_ENDPOINT = API_ENDPOINT + 'user'

/**
 * Get all users
 *
 * @return {Object} 200
 *    num_results: {string}
 *    success: {string}
 *    users: {Array<Object>}
 * @throws {Exception<Object>}
 *    error: {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const getUsers = () =>
  axios(USER_ENDPOINT, {
    withCredentials: true,
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


/**
 * Save a new user and send verification email
 *
 * @param {object} user
 * @return {object} 200
 *    succes: {string}
 * @throws {Exception<Object>}
 *    error: {string} Authorization 401
 *           {string} MissingData 400
 *           {string} IntegrityError 400
 *           {string} SQLAlchemyError 400
 */
export const saveUser = (user) =>
  axios(USER_ENDPOINT, {
    method: 'post',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      Authorization: 'Basic ' + btoa(
        `${user.username}:${user.password}`),
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      name: user.name,
      email: user.email,
      picture: user.picture,
      provider: user.provider,
      provider_user_id: user.provider_user_id,
      token: user.token,
    })
  })
  .then(res => {
    const data = res.data
    data.access = res.headers.access
    data.refresh = res.headers.refresh
    return data
  })

  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


/**
 * Edits a user's profile information
 *
 * @param {string} csrfAccessToken
 * @param {Object} user
 * @return {Object} 200
 *    success: {string}
 *    user: {Object}
 * @throws {Exception<Object>}
 *    error: {string} InvalidID 400
 *           {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const editUser = (csrfAccessToken, user) =>
  axios(`${USER_ENDPOINT}/${user.public_id}`, {
    method: 'put',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfAccessToken,
    },
    data: JSON.stringify(user)
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


/**
 * Takes in a token and password and
 * resets the user's password
 *
 * @param {object} credentials
 * @return {object} 200
 *    success: {string}
 *    user: {Object}
 * @throws {Exception<Object>}
 *    error: {string} MissingToken 400
 *           {string} ExpiredSignatureError 400
 *           {string} DecodeJWTError 400
 *           {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const resetPassword = (credentials) =>
  axios(`${USER_ENDPOINT}/${credentials.public_id}`, {
    method: 'put',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${credentials.token}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      password: credentials.password,
    })
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


/**
 * Takes in credentials and changes a user's password
 *
 * @param {string} csrfAccessToken
 * @param {object} credentials
 * @return {object} 200
 *    success: {string}
 *    user: {Object}
 * @throws {Exception<Object>}
 *    error: {string} Authorization 401
 *           {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 *           {string} InvalidPwd 400
 */
export const changePassword = (csrfAccessToken, credentials) =>
  axios(`${USER_ENDPOINT}/${credentials.public_id}`, {
    method: 'put',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      Authorization: 'Basic ' + btoa(
        `${credentials.public_id}:${credentials.oldPassword}`),
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfAccessToken,
    },
    data: JSON.stringify({
      password: credentials.password,
    })
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


/**
 * Delete user
 *
 * @param {string} csrfAccessToken
 * @param {string} id
 * @return {Object} 200
 *    success: {string}
 * @throws {Exception<Object>}
 *    error: {string} InvalidID 400
 *           {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const deleteUser = (csrfAccessToken, id) =>
  axios(`${USER_ENDPOINT}/${id}`, {
    method: 'delete',
    withCredentials: true,
    headers: {
      'X-CSRF-Token': csrfAccessToken,
    }
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })
