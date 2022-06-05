// api url
const api_url = "https://2q6e55.deta.dev/all";

let header = new Headers({
  'Access-Control-Allow-Origin':'*'
});

fetch(api_url, {
  mode: 'cors',
  header: header
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    console.log(data);
    displayHealth(data)
  })
  .catch((error) => console.error("FETCH ERROR:", error));

function displayHealth(data) {

  const health = data[0];
  const healthDiv = document.getElementById("health");    

  // health name
  const healthDate = health.date;
  const heading = document.createElement("h1");
  heading.innerHTML = healthDate;
  healthDiv.appendChild(heading);

}