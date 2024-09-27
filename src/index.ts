import express from "express"; // Import the express module
import router from "./routes"; // Import the router from the routes module

const app: express.Application = express(); // Create an instance of an Express application
const port: number = 3000; // Define the port number on which the server will listen

// Middleware to log incoming API calls
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        console.log(`Request processed in ${elapsedTime} ms\n`);
    });

    console.log(`Received ${req.method} request for ${req.url}`);

    next(); // Call next() if the request path does not match any static files
  }
);

app.use("/", router); // Use the imported router for handling routes starting from the root path

app.listen(port, () => {
  console.log(`Server listening on port ${port}`); // Start the server and listen on the defined port
});
