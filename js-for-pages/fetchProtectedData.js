import { handleErrors } from '../fetchUtils.js'
import { SERVER_URL } from '../settings.js'

export async function fetchData() {
  try {
    const loggedInAs = sessionStorage.getItem('logged-in-as')
    const ENDPOINT_URL = SERVER_URL + 'message/' + loggedInAs.toLowerCase()
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    }
    const response = await fetch(ENDPOINT_URL, options).then((res) => handleErrors(res))
    document.getElementById('msg-from-server').innerText = response.msg
  } catch (err) {
    document.getElementById('error').innerText = err.message
  }
}
