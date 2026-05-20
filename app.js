const express = require("express");
const cors = require("cors");
const router = require("./routers");
const app = express();
require('dotenv').config()

// middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// endpoints
app.use(router);

module.exports = app;