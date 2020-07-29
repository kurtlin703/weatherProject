const express = require("express");
const https = require("https");
let bodyParser = require("body-parser");
//const { STATUS_CODES } = require("http")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});
app.post("/", (req, res) => {
  let query = req.body.cityName;
  let apiKey = "84ca0c730c664cd83ad6d57ea19b6939";
  let unit = "metrics";
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    " &units=" +
    unit;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      let weatherData = JSON.parse(data);
      let temp = weatherData.main.temp
      let weatherDescription = weatherData.weather[0].description;
      let icon = weatherData.weather[0].icon;
      let imageURL = "http://openweathermap.org/img/wn/ " + icon + "@2x.png";
      res.write("<p> the weather is currently " + weatherDescription + " </p>");
      res.write("<img src=" + imageURL + " >");
      res.write(
        "<h1>the temperature in " +
          query +
          " is " +
          temp +
          " degres celcius</h1> "
      );
      res.send();
    });
  });
});

// app.listen(3000, () => {
//   console.log("server is running");
// });
