const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const units = { m: "°C", s: "K", f: "°F" };

// Define paths
const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs"); // set up handlebars
app.set("views", viewsDirectory);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory)); // setup static directory

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Nitish Gupta",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Nitish Gupta",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Nitish Gupta",
    message: "Here you can find how this website works.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }

  geoCode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(longitude, latitude, req.query.unit, (error, data) => {
        if (error) {
          return res.send({ error });
        }

        res.send(data);
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Nitish Gupta",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Nitish Gupta",
    message: "This page does not exist. Please visit the above valid links.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
