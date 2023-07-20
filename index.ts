// Import express library.
import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const fs = require("fs");

// Configure dotenv library to load in the environment variables from .env file.
dotenv.config();

// Initialize the express engine.
const app: Express = express();

// body-parser middeleware to parse the request body
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));

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
    if (!fs.existsSync("./data")) {
      fs.mkdirSync("./data");
    }
    if (!fs.existsSync("./data/spreadsheet.json")) {
      fs.writeFileSync("./data/spreadsheet.json", "[]", (error: Error) => {
        if (error)
          console.error("Error trying to write file sync: --> ", error);
      });
    }

    // Note: If the file starts with "./" it is considered a relative file to the file that called require.
    const spreadsheet = fs.readFileSync("./data/spreadsheet.json", "utf8");
    response.send(spreadsheet);
  } catch (err: any) {
    response.send("Error: " + err);
  }
});

// Endpoint for saving the spreadsheet.json file.
app.post("/sp/set", (request: Request, response: Response) => {
  // Try to save spreadsheet.json file with the data from the user's file system.
  // If it doesn't exist, make it and return an empty spreadsheet.json file.
	try {
		const data = Buffer.alloc(JSON.stringify(request.body).length, JSON.stringify(request.body))
		fs.writeFileSync("./data/spreadsheet.json", data);
    response.send("Success ---> spreadsheet.json file saved.");
  } catch (err: any) {
    response.send("Nadia's  Error: " + err);
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
