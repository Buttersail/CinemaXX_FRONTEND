import { encode, showPage } from '../utils.js'
import { SERVER_URL } from '../settings.js'
import { makeOptions } from '../fetchUtils.js'
import { details } from './details.js'

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
      let movieIDs = data.map((movie) => movie.id)
      const rows = data
        .map(
          (movie) => `
      <div class="col-3 m-2" style="border-radius: 20px; box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px">
          <div class="row"><div class="col" style="display: flex;justify-content: center;"><img src="https://image.tmdb.org/t/p/w300${encode(
            movie.cover
          )}"></div></div>
          <div class="row"><div class="col" style="display: flex;justify-content: center;"><h4>${encode(movie.title)}</h4></div></div>
          <div class="row justify-content-center"><button class="btn btn-primary" value="${encode(movie.id)}" id="btn-details-id${encode(
            movie.id
          )}">Details</button></div>
      </div>
      `
        )
        .join('\n')

      document.getElementById('info').innerHTML = rows

      movieIDs.forEach((id) => {
        document.getElementById('btn-details-id' + id).onclick = details
      })
    })
}
