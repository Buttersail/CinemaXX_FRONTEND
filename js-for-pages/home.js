import { encode, showPage } from '../utils.js'
import { SERVER_URL } from '../settings.js'

let URL = SERVER_URL + '/api/movies'

export function setupMovieHandlers() {
  document.getElementById('btn-show-movies').onclick = showMovies
  document.getElementById('btn-buy').onclick = buy
}

function showMovies() {
  console.log('show me a movie pls')
  // let movieURL = URL
  // fetch(movieURL)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log('does this even work?')
  //     console.log(data)
  //   })
  showMoviePosters()
}

function buy() {
  console.log('Does this work?')
  showPage('page-cinemas')
}

function showMoviePosters() {
  document.getElementById('doctor-strange-2').style.visibility = 'visible'
  document.getElementById('top-gun-2').style.visibility = 'visible'
}
