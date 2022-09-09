const container = document.querySelector('.container')
const count = document.querySelector('#count')
const price = document.querySelector('#price')
const seats = document.querySelectorAll('.row .seat:not(.ocuupied)')

const movies = document.querySelector('#movie')
let moviePrice = movies.querySelector('option').value
/*** Initial Call Section ***/
populateUI();
updatePrice();
/*** Function Section ***/
function updatePrice() {
    let selectedSeat, seatCount, totalPrice;

    selectedSeat = document.querySelectorAll('.row .seat.selected')    
    seatCount = +selectedSeat.length
    totalPrice = seatCount * moviePrice

    count.textContent = seatCount
    price.textContent = totalPrice
    /* Get Number of SelectedSeat and Store it in LocaleStorage */
    const selectedSeatNumber = [...selectedSeat].map(seat => [...seats].indexOf(seat))
    localStorage.setItem('selectedSeat', JSON.stringify(selectedSeatNumber))
}
//Sent Movie Data to LocaleStorage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('movieIndex', movieIndex)
    localStorage.setItem('moviePrice', moviePrice)
}
//Get Data from LocaleStorage and Populata UI
function populateUI() {
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeat'))    
    if (selectedSeat !== null && selectedSeat.length > 0) {
        seats.forEach((seat, index) => {            
            if (selectedSeat.indexOf(index) > -1)
                seat.classList.add('selected')
        })
    }

    const movieIndex = localStorage.getItem('movieIndex')
    if (movieIndex !== null) 
        movies.selectedIndex = movieIndex
}
/*** EventListener Section  ***/
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('ocuupied')) {
        e.target.classList.toggle('selected')
        updatePrice()
    }
})
movies.addEventListener('change', (e) => {
    moviePrice = +e.target.value
    updatePrice()
    setMovieData(e.target.selectedIndex, +e.target.value)
})