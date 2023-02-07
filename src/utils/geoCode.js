const axios = require("axios");

const geoCode = (address, callback) => {
  axios
    .get("http://api.positionstack.com/v1/forward", {
      params: {
        access_key: "5f17b3e8c26ec0d2c81c081abef59535",
        query: address,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        const cords = response.data.data;

        if (cords.length === 0) {
          callback("Invalid location", undefined);
        }

        callback(undefined, {
          longitude: cords[0].longitude,
          latitude: cords[0].latitude,
          location: cords[0].label,
        });
      } else {
        callback(response.status, undefined);
      }
    })
    .catch((error) => {
      if (error.code === "ENOTFOUND") {
        callback("Not connected to the Internet.", undefined);
      } else if (error.code === "ERR_BAD_REQUEST") {
        callback("Invalid location", undefined);
      }
    });
};

module.exports = geoCode;
