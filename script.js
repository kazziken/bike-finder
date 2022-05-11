let cityUl = document.querySelector('#city-Ul')
const searchSubmit = document.querySelector ('#form')
const body = document.querySelector('body')
body.id = 'body'

//fetch request from citybikes api server
fetch('https://api.citybik.es/v2/networks')
.then (res => res.json())
.then (data => {
  let networkData = data["networks"]
  networkData.forEach (network => renderCities(network))
})

function renderCities (network) {
  cityName = document.createElement('li')
  // cityName.sort()
  cityName.innerHTML = network.location.city
  cityName.classList = 'list'
  cityUl.append(cityName)
  cityName.addEventListener('click', () => renderNetwork(network))
}

function renderNetwork(network) {
  let child = cityUl.lastElementChild
  while (child) {
    cityUl.removeChild(child)
    child = cityUl.lastElementChild
  }
  cityName = document.createElement('li')
  cityName.innerHTML = network.location.city
  cityName.classList = 'list'
  cityUl.append(cityName)
  
  fetch (`https://api.citybik.es/v2/networks/${network.id}`)
  .then(res => res.json())
  .then(network => renderStations(network))
}

const stations = document.querySelector('#station-details')
const freeBikes = document.querySelector('#free-bikes')
const availableSlots = document.querySelector('#empty-slots')


function renderStations(network) {
  let stationInfo = document.createElement('ul')
  cityUl.append(stationInfo)
  
  let networkName = document.createElement('p')
  networkName.innerHTML = network["network"].name
  networkName.classList ='center'
  stations.append(networkName)
  
  
  let destinationStation = network['network'].stations
  for(station of destinationStation) {
    let stationName = document.createElement('li')
    stationName.innerHTML = station.name
    let emptySlots = document.createElement('li')
    emptySlots.innerHTML = `Empty Slots: ${station.empty_slots}`
    let availableBikes = document.createElement('li')
    availableBikes.innerHTML = `Available Bikes: ${station.free_bikes}`
    // let acceptedPayment = document.createElement('li')
    // acceptedPayment.innerHTML = station.extra.payment

    stationInfo.append(stationName, emptySlots, availableBikes)
  }

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
        return networkID = network.id
      } 
    } 
  })
})



    // fetch(`https://api.citybik.es/v2/networks/${networkID}`)
    //   .then(res => res.json())
    //   .then(data => matchName(data))

    //   function matchName (network) {
    //     console.log(network)
        // let networkData = data["networks"]
        // if("New York City" === networkData.location.city)
        // console.log(network.company)
  //     }
  // )




  // function matchName (network) {
  //   let networkData = data["networks"]
  //   if("New York City" === networkData.location.city)
  //   console.log(network.company)
  // }
















// //@city
//     fetch('https://api.citybik.es/v2/networks')
//   .then (res => res.json())
//   .then (data => {
//     let networkData = data["networks"]
//     networkData.forEach(network => console.log(network.location.city))
//     })

// //@network
//     fetch('https://api.citybik.es/v2/networks')
//   .then (res => res.json())
//   .then (data => {
//     let networkData = data["networks"]
//     networkData.forEach(network => console.log(network.location))
//     })

// // function getAllCities(city){
// //   cities = document.
// // }