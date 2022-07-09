// alert("hi");

// import Chart from 'https://cdn.jsdelivr.net/npm/chart.js';

// api url
const api_url = "https://2q6e55.deta.dev/all";
const options = {
  method: 'GET',
  mode: "cors",
  // credentials: 'omit',
	headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
	}
};

fetch(api_url, options)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    console.log(data);
    displayDate(data)
    displayBpm(data)
    displayConfidence(data)
  })
  .catch((error) => console.error("FETCH ERROR:", error));

function displayDate(data) {

  const date = data[0];
  const dateDiv = document.getElementById("date");    

  // date name
  const dateDate = date.date;
  const heading = document.createElement("h2");
  heading.innerHTML = "Date: " + dateDate;
  dateDiv.appendChild(heading);

}

function displayBpm(data) {

  const bpm = data[0];
  const bpmDiv = document.getElementById("bpm");    

  // bpm name
  const bpmBpm = bpm.mean_bpm;
  const heading = document.createElement("h2");
  heading.innerHTML = "Average Bpm: " + bpmBpm;
  bpmDiv.appendChild(heading);

}

function displayConfidence(data) {

  const confidence = data[0];
  const confidenceDiv = document.getElementById("confidence");    

  // confidence name
  const bpmConfidence = confidence.mean_confidence;
  const heading = document.createElement("h2");
  heading.innerHTML = "Average Confidence: " + bpmConfidence;
  confidenceDiv.appendChild(heading);

}

// var ctx = document.getElementById("myChart");
// var myChart = new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     datasets: [
//       {
//         label: "# of Votes",
//         data: [12, 19, 3, 5, 2, 3]
//       }
//     ]
//   },
//   options: {
//     scales: {
//       y: {
//         ticks: {
//           beginAtZero: true
//         }
//       }
//     }
//   }
// });

// const labels = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
// ];

// const data = {
//   labels: labels,
//   datasets: [{
//     label: 'My First dataset',
//     backgroundColor: 'rgb(255, 99, 132)',
//     borderColor: 'rgb(255, 99, 132)',
//     data: [0, 10, 5, 2, 20, 30, 45],
//     tension: 0.1,
//   }]
// };

// const config = {
//   type: 'line',
//   data: data,
//   options: {}
// };

// const myChart = new Chart(
//   document.getElementById('myChart'),
//   config
// );