import { encode } from "../utils.js";
import { SERVER_URL} from "../settings.js"

let URL = SERVER + "/api/screenings"
const screening = {}

export function setupCreateScreeningHandlers(){
    document.getElementById("create-screening").onclick = createScreening
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