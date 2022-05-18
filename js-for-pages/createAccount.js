import { encode } from "../utils.js";
import { SERVER_URL} from "../settings.js"
import { makeOptions } from "../fetchUtils.js";
const URL = SERVER_URL + "/persons/customer"
const person = {}

export function setupCreateAccountHandlers(){
    document.getElementById("create-account-btn").onclick = createAccount
}

function createAccount(evt){
    evt.preventDefault()
    person.firstName = document.getElementById("firstname-input").value
    person.lastName = document.getElementById("lastname-input").value
    person.phoneNumber = document.getElementById("phonenumber-input").value
    person.email = document.getElementById("email-input").value
    person.username = document.getElementById("username-input").value
    person.password = document.getElementById("password-input").value
    
    const options = makeOptions("POST",person,false)
    
    fetch(URL,options)
    .then(res => res.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
}