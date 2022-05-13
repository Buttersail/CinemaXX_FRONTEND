import { encode } from "../utils.js";
import { SERVER_URL} from "../settings.js"
import { makeOptions } from "../fetchUtils.js";

const URL = SERVER_URL + "/api/screenings"
const screening = {}

export function setupCreateScreeningHandlers(){
    document.getElementById("create-screening").onclick = createScreening
    document.getElementById("selected-cinema-id-btn").onclick = createHallOptions
}

export function onCinemaSelect(){
    
}

function createScreening(){
    screeningInput();
}

function screeningInput(){
    screening.duration = document.getElementById("screening-duration").value
    screening.showTime = document.getElementById("show-time").value
    screening.movieId = document.getElementById("selected-movie-id").value
    screening.staffId = document.getElementById("staff-id").value
    screening.cinemaId = document.getElementById("selected-cinema-id").value
    screening.hallId = document.getElementById("selected-hall-id").value
}

function createHallOptions(){
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