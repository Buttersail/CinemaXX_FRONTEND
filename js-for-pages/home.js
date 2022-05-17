import { encode, showPage } from '../utils.js'
import { SERVER_URL } from '../settings.js'
import { makeOptions } from '../fetchUtils.js'

let URL = SERVER_URL + '/movies'

export function setupMovieHandlers() {
  showMovies()
}

function showMovies() {
  console.log('show me a movie pls')
  let movieURL = URL
  let options = makeOptions('GET', false, true)

  fetch(movieURL, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      console.log('Fetch All Movies')
      const rows = data
        .map(
          (movie) => `
      <tr>
          <td><img src="https://image.tmdb.org/t/p/w200${encode(movie.cover)}"></td>
          <br/>
          <td>${encode(movie.title)}</td>
          <br/>
          <button id="btn-details">Details</button>
          <br/>
      </tr>
      `
        )
        .join('\n')

      document.getElementById('info').innerHTML = rows
      document.getElementById('btn-details').onclick = details
    })
}

function details() {
  let movieURL = URL + ''
  let options = makeOptions('GET', false, true)

  fetch(movieURL, options)
    .then((res) => res.json())
    .then((data) => {
      console.log('Details clicked')
      const details = data.map((movie) => {
        console.log(movie.id)
      })
    })
}
