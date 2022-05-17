import { renderTemplate, setActive, showPage } from './utils.js'
import { setupLoginHandlers, logout, updateLoginDependentComponents } from './js-for-pages/login.js'
import { fetchData } from './js-for-pages/fetchProtectedData.js'
import {setupCreateScreeningHandlers, makeForm} from './js-for-pages/createScreening.js'
import { setupMovieHandlers } from './js-for-pages/home.js'


function renderMenuItems(evt) {
  const element = evt.target
  setActive(element)
  const id = element.id
  renderTemplate(id) //This setups the HTML for the page
  switch (id) {
    //Here you can execute JavaScript for the selected page
    case 'page-secret': {
      fetchData()
      break
    }
    case 'page-home': {
      setupMovieHandlers()
      break
    }
    case 'page-login': {
      setupLoginHandlers()
      break
    }
    case 'page-logout': {
      logout()
      break
    }
    case 'page-create-screening': {
      makeForm()
      setupCreateScreeningHandlers()
      break
    }
  }
}

document.getElementById('menu').onclick = renderMenuItems
showPage('page-home') //Set the default page to render
updateLoginDependentComponents()
