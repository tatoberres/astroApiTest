const debug = require("debug")("controller");
const astroApi = require("../astroApi");

const controller = {
  async getBodies(req, res) {
    try {
      const result = await astroApi.bodies();
      //debug(result);

      res.json(result);
    } catch (error) {
      debug(error);
    }
  },
  async getAllPositions(req, res) {
    try {
      const result = await astroApi.allPositions();
      //debug(result);
      res.json(result);
    } catch (error) {
      debug(error);
    }
  },
  async getOnePosition(req, res) {
    const body = req.params.body;
    try {
      const result = await astroApi.onePosition(body);
      //debug(result);

      res.json(result);
    } catch (error) {
      debug(error);
    }
  },
  async postStarChart(req, res) {
    const params = req.body;
    debug(params);
    try {
      const result = await astroApi.starChart(params);
      debug(result);

      //return result.image;
    } catch (error) {
      debug(error);
    }
  },
};

module.exports = controller;
