const filmsUrl = "http://localhost:3000/films";
const poster = document.getElementById("poster");
const titleElement = document.getElementById("title");
const runtimeElement = document.getElementById("runtime");
const remainingTicketsElement = document.getElementById("tickets-total");
const filmsList = document.getElementById("films");
const showtimeElement = document.getElementById("showtime");
const filmInfoElement = document.getElementById("film-info");
let filmsData = [];

// Fetch data for the first film and display it
fetch(`${filmsUrl}/1`)
  .then(response => response.json())
  .then(displayFirstFilm)

// Fetch all films data and render them in the films list
fetch(filmsUrl)
  .then(response => response.json())
  .then(data => {
    filmsData = data;
    renderFilms();
  })
  

// Display details of the first film
function displayFirstFilm(film) {
  displayFilmInfo(film);
}

// Render all films in the films list
function renderFilms() {
  filmsList.innerHTML = "";
  filmsData.forEach(film => {
    const filmCard = createFilmCard(film);
    filmsList.appendChild(filmCard);
    filmCard.addEventListener("click", () => displayFilmInfo(film));
  });
}

// Create a film card element
function createFilmCard(film) {
  const filmCard = document.createElement("li");
  filmCard.classList.add("film");
  filmCard.textContent = film.title;
  return filmCard;
}

// Display detailed information of a film
function displayFilmInfo(film) {
  poster.src = film.poster;
  poster.alt = film.title;
  titleElement.textContent = film.title;
  runtimeElement.textContent = `${film.runtime} minutes`;
  filmInfoElement.textContent = film.description;
  showtimeElement.textContent = film.showtime;
  remainingTicketsElement.textContent = film.capacity - film.tickets_sold;
}

// Handle buying a ticket
document.getElementById("buy-ticket").addEventListener("click", buyTicket);

function buyTicket() {
  const remainingTickets = parseInt(remainingTicketsElement.textContent);
  if (remainingTickets > 0) {
    remainingTicketsElement.textContent = remainingTickets - 1;
  }
}
