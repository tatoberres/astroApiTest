require("dotenv").config();
const debug = require("debug")("astroApi");
const fetch = require("node-fetch");
const users = require("../data/users.json");

const hash = Buffer.from(
  `${process.env.applicationId}:${process.env.applicationSecret}`
).toString("base64");

const baseUrl = "https://api.astronomyapi.com/api/v2";
const bodies = "/bodies";
const positions = "/positions";
const stars = "/studio/star-chart";

// const query = (user) => {
//   const dateFrom = user.date.from;
//   const dateTo = user.date.to;
//   const locLong = user.observer.location.longitude;
//   const locLat = user.observer.location.latitude;
//   const elevation = user.observer.location.elevation;
//   const time = user.observer.location.time;

//   return `?latitude=${locLat}&longitude=${locLong}&elevation=${elevation}&from_date=${dateFrom}&to_date=${dateTo}&time=${time}`;
// };

const astronomyApi = {
  query: (user) => {
    const dateFrom = user.date.from;
    const dateTo = user.date.to;
    const locLong = user.observer.location.longitude;
    const locLat = user.observer.location.latitude;
    const elevation = user.observer.location.elevation;
    const time = user.observer.location.time;

    return `?latitude=${locLat}&longitude=${locLong}&elevation=${elevation}&from_date=${dateFrom}&to_date=${dateTo}&time=${time}`;
  },
  async bodies() {
    try {
      const response = await fetch(`${baseUrl}${bodies}`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${hash}`,
        },
      });
      const json = await response.json();
      debug(json);
      if (response.ok) {
        return json.data.bodies;
      }
    } catch (error) {
      debug(error);
    }
  },
  async allPositions() {
    const query = this.query(users.juan);
    try {
      const response = await fetch(`${baseUrl}${bodies}${positions}${query}`, {
        method: "GET",
        headers: {
          authorization: `basic ${hash}`,
        },
      });

      const json = await response.json();
      if (response.ok) {
        return json.data.table.rows;
      }
    } catch (error) {
      debug(error);
    }
  },
  async onePosition(body) {
    debug(body);
    const query = this.query(users.juan);
    try {
      const response = await fetch(
        `${baseUrl}${bodies}${positions}/${body}${query}`,
        {
          method: "GET",
          headers: {
            authorization: `basic ${hash}`,
          },
        }
      );

      const json = await response.json();
      if (response.ok) {
        return json.data.table.rows[0].cells;
      }
    } catch (error) {
      debug(error);
    }
  },
  async starChart(params) {
    debug(params);
    try {
      const response = await fetch(`${baseUrl}${stars}`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          authorization: `basic ${hash}`,
        },
      });
      debug(response);

      const json = await response.json();
      debug(json);

      if (response.ok) {
        debug(json);
        return json.data.imageUrl;
      }
    } catch (error) {
      debug(error);
    }
  },
};

module.exports = astronomyApi;
