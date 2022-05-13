fetch('https://api.citybik.es/v2/networks')
  .then (res => res.json())
  .then (data => {
    let networkData = data["networks"]
    networkData.forEach (network => renderCities(network))
})

let cityUl = document.querySelector('#city-Ul')
const searchSubmit = document.querySelector ('#form')
const refresh = document.querySelector('#refresh')
const body = document.querySelector('body')
const toggle = document.querySelector('#toggle-mode')
const footer = document.querySelector('#footer')

function renderCities (network) {
  cityName = document.createElement('li')
  cityName.innerHTML = network.location.city
  cityName.classList = 'list'
  cityUl.append(cityName)
  cityName.addEventListener('click', () => renderNetwork(network))
  cityName.addEventListener('mouseover', mouse)
}

function mouse(e) {
  e.target.classList.toggle('mouse')
}

refresh.addEventListener('click', () => {
  cityUl.innerHTML = ' '
  networkDetails.innerHTML = ' '
  fetch('https://api.citybik.es/v2/networks')
  .then (res => res.json())
  .then (data => {
    let networkData = data["networks"]
    networkData.forEach (network => renderCities(network))
  })
})

toggle.addEventListener('click', toggleMode)

function toggleMode () {
  body.classList.toggle('darkmode')
  body.firstElementChild.classList.toggle('togglemode')
  networkDetails.classList.toggle('togglemode')
  line.classList.toggle('linemode')
  networkName.classList.toggle('togglemode')
  footer.classList.toggle('togglemode')
  company.classList.toggle('togglemode')
  cityNetwork.classList.toggle('togglemode')
  count.classList.toggle('togglemode')
}


function renderNetwork(network) {
  cityUl.innerHTML = ''

  fetch (`https://api.citybik.es/v2/networks/${network.id}`)
  .then(res => res.json())
  .then(network => renderStations(network))
}

const networkDetails = document.querySelector('#network-details')
const count = document.querySelector('#station-count')
const company = document.querySelector('#company-name')
const freeBikes = document.querySelector('#free-bikes')
const cityNetwork = document.querySelector('#city-name')
const networkName = document.querySelector('#network-name')
const availableSlots = document.querySelector('#empty-slots')
let line = document.createElement('hr')


function renderStations(network) {
  let stationInfo = document.createElement('div')
  cityUl.append(stationInfo)
  
  let networkStations = network['network'].stations
  
  let nextButton = document.createElement('button')
  nextButton.style.backgroundColor = '#85c1e9'

  let prevButton = document.createElement('button')
  nextButton.innerHTML = "Next >"
  prevButton.innerHTML = "< Prev"
  
  networkDetails.innerHTML = ' '
  cityNetwork.innerHTML = `City: ${network['network'].location.city}`
  networkName.innerHTML = `Network Name: ${network["network"].name}`
  count.innerHTML = `Number of Stations: ${(network["network"].stations).length}`
  company.innerHTML = `Company Name: ${network["network"].company}`

  networkDetails.append(cityNetwork, networkName, company, count, line, prevButton, nextButton)


  let start = 0
  let end = 30

  for (start; start<end; start++) {
    let stationName = document.createElement('h3')
    stationName.innerHTML = networkStations[start].name
    let emptySlots = document.createElement('p')
    emptySlots.innerHTML = `Empty Slots: ${networkStations[start].empty_slots}`
    let availableBikes = document.createElement('p')
    availableBikes.innerHTML = `Available Bikes: ${networkStations[start].free_bikes}`
    let line = document.createElement('hr')

    stationInfo.append(stationName, emptySlots, availableBikes, line)
  }

  start = 0

  nextButton.addEventListener('click', function() {
    start = end
    end += 30

    stationInfo.innerHTML = " "

    for(start; start<end; start++) {
      let stationName = document.createElement('h3')
      stationName.innerHTML = networkStations[start].name
      let emptySlots = document.createElement('p')
      emptySlots.innerHTML = `Empty Slots: ${networkStations[start].empty_slots}`
      let availableBikes = document.createElement('p')
      availableBikes.innerHTML = `Available Bikes: ${networkStations[start].free_bikes}`
      let line = document.createElement('hr')

      stationInfo.append(stationName, emptySlots, availableBikes, line)
      
    }
    start -=30
  })

  prevButton.addEventListener('click', function () {
    end = start
    start -= 30

    stationInfo.innerHTML = " "
    
    for(start; start<end; start++) {
      let stationName = document.createElement('h3')
      stationName.innerHTML = networkStations[start].name
      let emptySlots = document.createElement('p')
      emptySlots.innerHTML = `Empty Slots: ${networkStations[start].empty_slots}`
      let availableBikes = document.createElement('p')
      availableBikes.innerHTML = `Available Bikes: ${networkStations[start].free_bikes}`
      let line = document.createElement('hr')

      stationInfo.append(stationName, emptySlots, availableBikes, line)
    }
    start -=30
  })
}

searchSubmit.addEventListener('submit', (e) => {
  e.preventDefault()
  if (e.target.firstElementChild.value === '') {
    alert('Please enter a city name')
  } else {
    let child = cityUl.lastElementChild
    while (child) {
      cityUl.removeChild(child)
      child = cityUl.lastElementChild
    }
  }
  
  fetch('https://api.citybik.es/v2/networks')
  .then (res => res.json())
  .then (data => {
    let networkData = data["networks"]
    networkData.filter (network => matchCities(network))
    
    function matchCities(network) {
      const searchInput = document.querySelector('#form')[0].value
      if(searchInput === network.location.city) {
        renderNetwork(network)
      } 
    } 
  })
})