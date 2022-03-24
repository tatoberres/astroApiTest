const { Router } = require("express");
const router = Router();
const controller = require("./controllers/controller");

// const baseUrl = ;

router.get("/", controller.getBodies);
router.get("/positions", controller.getAllPositions);
router.get("/positions/:body", controller.getOnePosition);
router.post("/star-chart", controller.postStarChart);

module.exports = router;
