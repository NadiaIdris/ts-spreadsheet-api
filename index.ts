// Import express library.
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// Configure dotenv library to load in the environment variables from .env file.
dotenv.config();

// Initialize the express engine.
const app: Express = express();

// Routes:
// Define default endpoint.
app.get("/", (request: Request, response: Response) => {
  response.send("Express + TypeScript server is running.");
});

// Endpoint for getting the spreadsheet.json file.
app.get("/sp/get", (request: Request, response: Response) => {
  // Try to get spreadsheet.json file with the data from the user's file system.
  // If it doesn't exist, make it and return an empty spreadsheet.json file.
  try {
    const fs = require("fs");
    if (!fs.existsSync("./data")) {
      fs.mkdirSync("./data");
    }
    if (!fs.existsSync("./data/spreadsheet.json")) {
      fs.writeFileSync("./data/spreadsheet.json", "{}");
    }

    // Note: If the file starts with "./" it is considered a relative file to the file that called require.
    const spreadsheet = fs.readFileSync("./data/spreadsheet.json", "utf8");
    response.send(spreadsheet);
  } catch (err: any) {
    console.log("Error: " + err);
    response.send("Error: " + err);
  }
});

// Endpoint for saving the spreadsheet.json file.
app.post("/sp/set", (request: Request, response: Response) => {
  // Try to save spreadsheet.json file with the data from the user's file system.
  // If it doesn't exist, make it and return an empty spreadsheet.json file.
  try {
    const fs = require("fs");
    fs.writeFileSync("spreadsheet.json", request.body);
    response.send("Success");
  } catch (err: any) {
    console.log("Error: " + err);
    response.send("Error: " + err);
  }
});

// Take a port 3000 for running the server.
const port = Number(process.env.BACK_PORT) || 3000;

// Server setup.
app.listen(port, () => {
  console.log(
    `[server]: Server is running at http://${process.env.BACK_HOST}:${port}`
  );
});
