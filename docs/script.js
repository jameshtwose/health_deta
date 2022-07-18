// alert("hi");

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
    // displayAll(data)
    displayPlot(data)
  })
  .catch((error) => console.error("FETCH ERROR:", error));

function displayDate(data) {

  const date = data[data.length - 1];
  const dateDiv = document.getElementById("date");    

  // date name
  const dateDate = date.date;
  const heading = document.createElement("h2");
  heading.innerHTML = "Date: " + dateDate;
  dateDiv.appendChild(heading);

}

function displayBpm(data) {

  const bpm = data[data.length - 1];
  const bpmDiv = document.getElementById("bpm");    

  // bpm name
  const bpmBpm = bpm.mean_bpm;
  const heading = document.createElement("h2");
  heading.innerHTML = "Average Bpm On This Date: " + bpmBpm;
  bpmDiv.appendChild(heading);

}

function displayConfidence(data) {

  const confidence = data[data.length - 1];
  const confidenceDiv = document.getElementById("confidence");    

  // confidence name
  const bpmConfidence = confidence.mean_confidence;
  const heading = document.createElement("h2");
  heading.innerHTML = "Average Confidence On This Date: " + bpmConfidence;
  confidenceDiv.appendChild(heading);

}

function displayAll(data) {
  allDiv = document.getElementById("all");
  const heading = document.createElement("h6");
  heading.innerHTML = "Output from API: " + JSON.stringify(data);
  allDiv.append(heading);
}

function displayPlot(data) {
  const labels = data.map(({ date }) => date);
  const ydata = data.map(({ mean_bpm }) => mean_bpm)
  const heartData = {
    labels: labels,
    datasets: [{
      label: 'Heart Rate Data',
      backgroundColor: 'rgb(0, 145, 255, 0.459)',
      borderColor: 'rgb(0, 145, 255)',
      data: ydata,
      tension: 0.1,
    }]
  };
  
  const config = {
    type: 'line',
    data: heartData,
    options: {}
  };
  
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

// let heartData
// let labels = data.map(({ key }) => key);

const data = {
  labels: labels,
  datasets: [{
    label: 'Heart Rate Data',
    backgroundColor: 'rgb(0, 145, 255, 0.459)',
    borderColor: 'rgb(0, 145, 255)',
    data: [0, 10, 5, 2, 20, 30, 45],
    tension: 0.5,
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);