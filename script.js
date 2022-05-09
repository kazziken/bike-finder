
//fetch request from citybikes api server
fetch('https://api.citybik.es/v2/networks')
  .then (res => res.json())
  .then (data => console.log(data))


console.log('hello')