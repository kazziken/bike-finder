const h2 = document.createElement("h2");
h2.textContent = "This content added by JavaScript";
document.querySelector("body").appendChild(h2);


fetch('https://api.citybik.es/v2/networks')
  .then (res => res.json())
  .then (data => console.log(data))


console.log('hello')