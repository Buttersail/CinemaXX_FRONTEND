import { encode } from "../utils.js";
import { SERVER_URL} from "../settings.js"
import { makeOptions } from "../fetchUtils.js";

const URL = SERVER_URL + "/api/screenings"
const screening = {}

export function setupCreateScreeningHandlers(){
    fetchMovies()
    fetchWorkerId()
    document.getElementById("create-screening").onclick = createScreening
    document.getElementById("selected-cinema-id-btn").onclick = createHallOptions
}

function createScreening(){
    screeningInput();
}

function screeningInput(){
    screening.duration = document.getElementById("screening-duration")
    screening.showTime = document.getElementById("show-time").value
    screening.movieId = document.getElementById("selected-movie-id").value
    screening.staffId = document.getElementById("staff-id").value
    screening.cinemaId = document.getElementById("selected-cinema-id").value
    screening.hallId = document.getElementById("selected-hall-id").value
    
    options = makeOptions("POST",screening,true)
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
    console.log("test123")
    let cinemaId = document.getElementById("selected-cinema-id").value
    fetch(SERVER_URL + "halls?cinemaId=" + cinemaId, options)
    .then(res => res.json())
    .then(data =>{
        const rows = data.map(hall => `
        <option value="${encode(hall.hallId)}"> Cinema Hall - ${encode(hall.hallNo)} - Size: ${hall.numberOfSeats} </option>
        `).join("\n")
        document.getElementById("selected-hall-id").innerHTML = rows
    })
}

function fetchWorkerId(){
    const options = makeOptions("GET",false,true)
    let username = sessionStorage.getItem('username')
    fetch(SERVER_URL + "persons/staff/" + username, options)
    .then(res => res.json())
    .then(staff => {
        const row = ` 
    <input class="form-control" type="text" value="${encode(staff.workerId)}" id="staff-id" readonly>`
    document.getElementById("staff-id-container").innerHTML = row
    }) 
}

function fetchMovies(){
    const options = makeOptions("GET",false,true)
    let i = 1;
    fetch(SERVER_URL + "movies",options)
    .then(res=> res.json())
    .then(data=> {
        const rows = data.map(movie =>`
        <option value="${encode(movie.movieId)}"> ${encode(i++)} - Title: ${encode(movie.title)} - Duration: ${encode(movie.duration)} - Age limit: ${encode(movie.ageLimit)}`
        ).join("\n")
        document.getElementById("selected-movie-id").innerHTML = rows
    })
}