require("dotenv").config();
const debug = require("debug")("index");
const express = require("express");
const app = express();
// const cors = require("cors");
const router = require("./app/router");

const port = process.env.PORT || 3000;

// const corsOptions = {
//   origin: process.env.CORS_DOMAINS ?? "*",
// };

// app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  debug(`Server started on http://localhost:${port}`);
});
