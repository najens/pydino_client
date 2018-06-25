import axios from 'axios'
import DOMAIN from '../../config'

// Url and API Endpoints
const API_ENDPOINT = DOMAIN + 'api/v1/'
const MAIL_CONTACT_ENDPOINT = API_ENDPOINT + 'contact'

/**
 * Takes in a user's contact info and sends
 * an email to the support team and a thank
 * you email to the user
 *
 * @param {object} contact
 * @return {object} 200
 *    success: {string}
 */
export const mailContact = (contact) =>
  axios(MAIL_CONTACT_ENDPOINT, {
    method: 'post',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(contact)
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err.response)
    return err.response.data
  })
