
//fetch request from citybikes api server
fetch('https://api.citybik.es/v2/networks')
  .then (res => res.json())
  .then (data => {
    let networkData = data["networks"]
    console.log(networkData.location["city"])
    networkData.forEach (network => console.log(network))
    })



//@city
    fetch('https://api.citybik.es/v2/networks')
  .then (res => res.json())
  .then (data => {
    let networkData = data["networks"]
    networkData.forEach(network => console.log(network.location.city))
    })

//@network
    fetch('https://api.citybik.es/v2/networks')
  .then (res => res.json())
  .then (data => {
    let networkData = data["networks"]
    networkData.forEach(network => console.log(network.location))
    })