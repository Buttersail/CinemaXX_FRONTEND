import { SERVER_URL } from '../settings.js'
import { makeOptions } from '../fetchUtils.js'
import { renderTemplate } from '../utils.js'
import { encode, showPage } from '../utils.js'

let URL = SERVER_URL + '/movies'

function setupDetailsHandler() {}

export function details(event) {
  renderTemplate('page-details')
  let movieURL = URL + '/' + event.currentTarget.value
  let options = makeOptions('GET', false, true)

  fetch(movieURL, options)
    .then((res) => res.json())
    .then((movie) => {
      console.log('Details clicked')
      console.log(movieURL)
      console.log(movie)
      const rows = `
      <div class="row">
          <div class="col col-md-4"><img src="https://image.tmdb.org/t/p/w500${encode(movie.cover)}"></div>
      <div class="col col-md-8">
          <div><b>Title:</b> ${encode(movie.title)}</div>
          <div><b>Age Limit:</b> ${encode(movie.ageLimit)}</div>
          <div><b>Duration:</b> ${encode(movie.duration)}</div>
          <div><b>Genre:</b> ${encode(movie.genre)}</div>
          <div><b>Overview:</b> ${encode(movie.overview)}</div>
          <div><b>Rating:</b> ${encode(movie.rating)}</div>
          <div><button class="btn btn-primary" value="${encode(movie.id)}" id="btn-reserve-ticket">Reserve Ticket</button><div>
      </div>
      </div>
      `

      document.getElementById('movie-details').innerHTML = rows
    })
}
