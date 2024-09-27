import express from "express"; // Import the express module
import router from "./routes"; // Import the router from the routes module

const app: express.Application = express(); // Create an instance of an Express application
const port: number = 3000; // Define the port number on which the server will listen

// Middleware to log incoming API calls
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  }
);

app.use("/", router); // Use the imported router for handling routes starting from the root path

app.listen(port, () => {
  console.log(`Server listening on port ${port}`); // Start the server and listen on the defined port
});
