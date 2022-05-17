import { encode } from "../utils.js";
import { SERVER_URL} from "../settings.js"
import { makeOptions } from "../fetchUtils.js";

const URL = SERVER_URL + "/screenings"
const screening = {}

export function setupCreateScreeningHandlers(){
   
    document.getElementById("create-screening-btn").onclick = createScreening
    document.getElementById("selected-cinema-id-btn").onclick = createHallOptions
}

export function makeForm(){
     fetchMovies()
    fetchWorkerId()
}
function createScreening(evt){
    evt.preventDefault()
    screening.duration = document.getElementById("screening-duration").value
    screening.showTime = document.getElementById("show-time").value
    screening.movieId = document.getElementById("selected-movie-id").value
    screening.username = document.getElementById("staff-id").value
    screening.cinemaId = document.getElementById("selected-cinema-id").value
    screening.hallId = document.getElementById("selected-hall-id").value
    
    const options = makeOptions("POST",screening,true)
    console.log(screening)
    fetch(URL,options)
    .then(res => res.json())
    .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}

function createHallOptions(evt){
    evt.preventDefault()

    const options = makeOptions("GET",false,true)
    
    let cinemaId = document.getElementById("selected-cinema-id").value
    fetch(SERVER_URL + "/halls?cinemaId=" + cinemaId, options)
    .then(res => res.json())
    .then(data =>{
        const rows = data.map(hall => `
        <option value="${encode(hall.id)}"> Cinema Hall - ${encode(hall.hallNo)} - Size: ${hall.numberOfSeats} </option>
        `).join("\n")
        document.getElementById("selected-hall-id").innerHTML = rows
    })
}

function fetchWorkerId(){
    const options = makeOptions("GET",false,true)
    let username = sessionStorage.getItem('username')
    fetch(SERVER_URL + "/persons/staff/" + username, options)
    .then(res => res.json())
    .then(staff => {
        const row = ` 
    <input class="form-control" type="text" value=${encode(username)} name="${encode(staff.workerId)}" id="staff-id" readonly>`
    document.getElementById("staff-id-container").innerHTML = row
    })  
}

function fetchMovies(){
    const options = makeOptions("GET",false,true)
    let i = 1;
    fetch(SERVER_URL + "/movies",options)
    .then(res=> res.json())
    .then(data=> {
        const rows = data.map(movie =>`
        <option value="${encode(movie.id)}"> ${encode(i++)} - Title: ${encode(movie.title)} - Duration: ${encode(movie.duration)} - Age limit: ${encode(movie.ageLimit)}`
        ).join("\n")
        document.getElementById("selected-movie-id").innerHTML = rows
    })
}