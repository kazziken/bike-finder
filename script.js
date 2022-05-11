let cityUl = document.querySelector('#city-Ul')
const searchSubmit = document.querySelector ('#form')
// const refresh = document.querySelector('#refresh')
const body = document.querySelector('body')

fetch('https://api.citybik.es/v2/networks')
  .then (res => res.json())
  .then (data => {
    let networkData = data["networks"]
    networkData.forEach (network => renderCities(network))
  })

function renderCities (network) {
  cityName = document.createElement('li')
  cityName.innerHTML = network.location.city
  cityName.classList = 'list'
  cityUl.append(cityName)
  cityName.addEventListener('click', () => renderNetwork(network))
}

// refresh.addEventListener('click', () => renderCities(network))

function renderNetwork(network) {
  let child = cityUl.lastElementChild
  while (child) {
    cityUl.removeChild(child)
    child = cityUl.lastElementChild
  }

  fetch (`https://api.citybik.es/v2/networks/${network.id}`)
  .then(res => res.json())
  .then(network => renderStations(network))
}

const networkDetails = document.querySelector('#network-details').firstElementChild
// const company = document.querySelector('#network-details').lastElementChild
const freeBikes = document.querySelector('#free-bikes')
const availableSlots = document.querySelector('#empty-slots')


function renderStations(network) {
  let stationInfo = document.createElement('div')
  cityUl.append(stationInfo)
  
  let networkName = document.createElement('p')
  networkName.innerHTML = network["network"].name
  networkName.classList ='center'
  networkDetails.append(networkName)
  
  let nextButton = document.createElement('button')
  nextButton.innerHTML = "Next"

  let networkStations = network['network'].stations


  let start = 0
  let end = 30
  
  networkDetails.append(nextButton)
    
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
  nextButton.addEventListener('click', function(){
  
  start = end
  end += 30

  stationInfo.innerHTML = " "
  networkDetails.append(nextButton)
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
    })
}

searchSubmit.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log('this is in search')
  let child = cityUl.lastElementChild
  while (child) {
    cityUl.removeChild(child)
    child = cityUl.lastElementChild
  }
    
  fetch('https://api.citybik.es/v2/networks')
    .then (res => res.json())
    .then (data => {
        let networkData = data["networks"]
        networkData.filter (network => matchCities(network))
    
    function matchCities(network) {
      const searchInput = document.querySelector('#form')[0].value
      if(searchInput === network.location.city) {
        renderCities(network)
      } 
    } 
  })
})