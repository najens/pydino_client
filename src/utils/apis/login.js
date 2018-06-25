import axios from 'axios'
import DOMAIN from './config'

// Url and API Endpoints
const API_ENDPOINT = DOMAIN + 'api/v1/'
const LOGIN_ENDPOINT = API_ENDPOINT + 'login'
const OAUTH_ENDPOINT = API_ENDPOINT + 'oauth'
const LOGOUT_ENDPOINT = API_ENDPOINT + 'logout'
const FORGOT_PASSWORD_ENDPOINT = API_ENDPOINT + 'password/forgot'
const CONFIRM_EMAIL_ENDPOINT = API_ENDPOINT + 'confirm/email/'
const REFRESH_TOKEN_ENDPOINT = DOMAIN + 'token/refresh'

/**
 * Login user w/ username and password
 * Sets access and refresh token cookies
 * and returns access and refresh headers
 *
 * @param {object} credentials
 * @return {object} 200
 *    access: {string}
 *    refresh: {string}
 *    success: {string}
 *    user: {Object}
 * @throws {Exception<Object>}
 *    error: {string} Authorization 401
 *           {string} SQLAlchemyError 400
 *           {string} InactiveUser 400
 *           {string} InvalidPwd 401
 */
export const loginUser = (credentials) =>
  axios(LOGIN_ENDPOINT, {
    withCredentials: true,
    'headers': {
      'Authorization': 'Basic ' + btoa(
        `${credentials.username}:${credentials.password}`)
    },
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
 * Login user w/ acess token. Sets new
 * access and refresh token cookies and
 * returns access and refresh headers
 *
 * @param {string} csrfAccessToken
 * @return {object} 200
 *    access: {string}
 *    refresh: {string}
 *    success: {string}
 *    user: {object}
 * @throws {Exception<Object>}
 *    error: {string} Authorization 401
 *           {string} SQLAlchemyError 400
 */
export const loginToken = (csrfAccessToken) =>
  axios(LOGIN_ENDPOINT, {
    withCredentials: true,
    headers: {
      'X-CSRF-Token': csrfAccessToken,
    }
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
 * Login user w/ 3rd party OAuth provider. Sets
 * new access and refresh token cookies and
 * returns access and refresh headers
 *
 * @param {string} token
 * @param {string} provider
 * @return {object} 200
 *    access: {string}
 *    refresh: {string}
 *    success: {string}
 *    user: {object}
 * @throws {Exception<Object>}
 *    error: {string} Authorization 401
 *           {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 *           {string} InactiveUser 400
 */
export const loginOAuth = (oauth, provider) =>
  axios(`${OAUTH_ENDPOINT}/${provider}`, {
    method: 'post',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + JSON.stringify(oauth.token),
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      name: oauth.name,
      email: oauth.email,
      picture: oauth.picture,
      provider_user_id: oauth.provider_user_id,
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
 * Logout user and remove access
 * and refresh token cookies
 *
 * @return {object} 200 success: {string}
 */
export const logoutUser = () =>
  axios(LOGOUT_ENDPOINT, {
    withCredentials: true,
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


/**
 * Takes in a username or email and sends
 * a confirmation email to the user
 *
 * @param {string} username or email
 * @return {object} 200
 *    success: {string}
 * @throws {Exception<Object>}
 *    error: {string} MissingInfo 400
 *           {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 */
export const forgotPassword = (username) =>
  axios(FORGOT_PASSWORD_ENDPOINT, {
    method: 'post',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      username,
    })
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


/**
 * Activates user's account and logs them in
 *
 * @param {string} token
 * @return {object} 200
 *    success: {string}
 *    user: {Object}
 * @throws {Exception<Object>}
 *    error: {string} ExpiredSignatureError 400
 *           {string} NoResultFound 404
 *           {string} SQLAlchemyError 400
 *           {string} IntegrityError 400
 */
export const confirmEmail = (token) =>
  axios(CONFIRM_EMAIL_ENDPOINT + token, {
    withCredentials: true,
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
 * Sends a refresh token and
 * returns a new access token
 *
 * @param {string} csrfRefreshToken
 * @return {Object} 200
 *    access: {string}
 *    success: {string}
 * @throws {Exception<Object>}
 *    error: {string} InvalidID 400
 */
export const refreshToken = (csrfRefreshToken) =>
  axios(REFRESH_TOKEN_ENDPOINT, {
    method: 'post',
    withCredentials: true,
    headers: {
      'X-CSRF-Token': csrfRefreshToken,
    },
  })
  .then(res => {
    const data = res.data
    data.access = res.headers.access
    return data
  })
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })


/**
 * Sends a csrf refresh token cookie
 * returns it as an object
 *
 * @return {Object} 200
 *    csrf_refresh_token: {string}
 *    success: {string}
 * @throws {Exception<Object>}
 *    error: {string} MissingToken 400
 */
export const getCSRFRefreshToken = () =>
  axios(REFRESH_TOKEN_ENDPOINT, {
    withCredentials: true,
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })
