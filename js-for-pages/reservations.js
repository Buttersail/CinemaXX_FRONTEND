import {renderTemplate, encode} from "../utils.js"
import {SERVER_URL} from "../settings.js"
import {makeOptions} from "../fetchUtils.js"
import { setupLoginHandlers } from "./login.js"



export function renderReservationForm(evt){
    const movieId = evt.currentTarget.value

    if(!sessionStorage.getItem("token")){
        renderTemplate("page-login")
        setupLoginHandlers()
    } 
    else {
        renderTemplate("page-reservation")
        fetchScreenings(movieId)
    }
}

function fetchScreenings(movieId){
    let URL = SERVER_URL + "/screenings/movie/" + movieId

    const options = makeOptions("GET", false, true)

    fetch(URL, options)
        .then((res) => res.json())
        .then((screeningResponses) => {
            console.log(screeningResponses)
            const screeningIds = screeningResponses.map((screening) => screening.id)
            const rows = screeningResponses.map((screening) => `
            <div class="col col-md-2 m-3 p-2 bg-primary" id="screeningId${encode(screening.id)}" data-value="${encode(screening.id)}" style="border-radius: 20px; box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px; ">
                <div>Placeholder Timeslot</div>
                <div>${encode(screening.cinemaResponse.name)}</div>
                <div>${encode(screening.hallResponse.hallNo)}</div>
            </div>
            `)

            document.getElementById("screenings-container").innerHTML = rows
            screeningIds.forEach(id => {
                document.getElementById("screeningId"+id).onclick = selectScreening
            });

        })

    document.getElementById("create-reservations-btn").onclick = makeReservation
}

function selectScreening(event){
    let selected = event.currentTarget
    document.getElementById("screeningId").value = selected.getAttribute("data-value")
    selected.classList.remove("bg-primary")
    selected.classList.add("bg-success")
}


async function makeReservation(){

    let URL = SERVER_URL + "/reservations"

    let reservationRequest = {}
    reservationRequest.screeningId = document.getElementById("screeningId").value
    reservationRequest.noSeats = document.getElementById("number-of-seats").value

    const options = makeOptions("POST", reservationRequest, true)

    renderTemplate("page-reservation-response")


    let result = await fetch(URL, options).then((res) => res.json())

    let html = result.map((reservation) =>`
        <div class="col">
            <h3>Reservation for: ${encode(reservation.movieTitle)}</h3>
            <p>Date: ${encode(reservation.showTime[2])}/${encode(reservation.showTime[1])}/${encode(reservation.showTime[0])} at ${encode(reservation.showTime[3])}:${encode(reservation.showTime[4])}</p>
            <p>Reservation number: ${encode(reservation.id)}</p>
            <p>Reserved by: ${encode(reservation.customerEmail)}</p
        </div><br>`).join("\n")

    document.getElementById("reservation-response-container").innerHTML=html 
}