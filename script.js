
let cityUl = document.querySelector('#city-Ul')
const searchSubmit = document.querySelector ('#form')

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
  cityUl.append(cityName)
  cityName.innerHTML = network.location.city
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