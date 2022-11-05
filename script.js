var api_url =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_Z6ger7V568jMt58TSJhHRWzDWCcis&ipAddress=";
const ipAddress = document.getElementById("ip-address");
const locationAddress = document.getElementById("location");
const timeZone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const inputText = document.getElementById("input-location");
const submitBtn = document.getElementById("submitBtn");

var locationX = 0;
var locationY = 0;
var map = L.map("map").setView([locationX, locationY], 13);
var marker = L.marker([locationX, locationY]).addTo(map);

function loadMap(locationX, locationY) {
  map.panTo(new L.LatLng(locationX, locationY));
  marker.setLatLng([locationX, locationY]).update();
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

function getData(api_url) {
  fetch(api_url).then(function (response) {
    response.json().then(function (data) {
      ipAddress.innerText = data.ip;
      locationAddress.innerText =
        data.location.city +
        " " +
        data.location.postalCode +
        data.location.country;
      timeZone.innerText = "UTC " + data.location.timezone;
      isp.innerText = data.isp;
      locationX = data.location.lat;
      locationY = data.location.lng;
      loadMap(locationX, locationY);
      console.log(data.location.lat + " " + data.location.lng);
    });
  });
}

function ValidateIPaddress(inputText) {
  var ipformat =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (inputText.match(ipformat)) {
    console.log("IP address valid");
    var inputIpAddress = inputText;
    getData(api_url + inputIpAddress);
  } else {
    alert("IP address is not valid");
    console.log("IP address INVALID");
  }
}

document.addEventListener("load", getData(api_url));
