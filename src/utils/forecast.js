const axios = require("axios");

const forecast = (longitude, latitude, unit, callback) => {
  axios
    .get("http://api.weatherstack.com/current", {
      params: {
        access_key: "c543ae72afa0badf33fd8e2d0ad059fe",
        query: `${latitude},${longitude}`,
        units: unit,
      },
    })
    .then((res) => {
      if (!res.data.error) {
        const weather = res.data;
        callback(undefined, {
          weatherData: weather.current,
          unit,
          location: {
            name: weather.location.name,
            country: weather.location.country,
            region: weather.location.region,
            localtime: weather.location.localtime,
          },
        });
      } else {
        callback(res.data.error.info, undefined);
      }
    })
    .catch((error) => {
      if (error.code === "ENOTFOUND") {
        callback("Not connected to the Internet.", undefined);
      } else {
        callback("Invalid location", undefined);
      }
    });
};

module.exports = forecast;
