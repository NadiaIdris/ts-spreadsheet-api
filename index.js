"use strict";
exports.__esModule = true;
// Import express library.
var express_1 = require("express");
var dotenv_1 = require("dotenv");
// Configure dotenv library to load in the environment variables from .env file.
dotenv_1["default"].config();
// Initialize the express engine.
var app = (0, express_1["default"])();
// Define default endpoint.
app.get('/', function (request, response) {
    response.send("Express + TypeScript server.");
});
// Take a port 3000 for running the server.
var port = Number(process.env.BACK_PORT) || 3000;
// Server setup.
app.listen(port, function () {
    console.log("[server]: Server is running at http://".concat(process.env.BACK_HOST, ":").concat(port));
});
