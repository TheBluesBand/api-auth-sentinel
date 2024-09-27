import { Router } from "express"; // Import the Router class from the express package
import { verifyToken, getToken, protectedRoute, getServerTime, handleIncorrectEndpoint } from "./controllers"; // Import the controller functions and middleware from controllers.ts

const router: Router = Router(); // Create a new router object

// Define the /token route
// Method: GET
// Handler: getToken - Generates and returns a JSON Web Token (JWT) to the user
router.get("/token", getToken);

// Define the /protected route
// Method: GET
// Middleware: verifyToken - Checks the validity of the JWT in the Authorization header
// Handler: protectedRoute - Responds with a message if the user is authenticated
router.get("/protected", verifyToken, protectedRoute);

// Define the /server-time route
// Method: GET
// Handler: getServerTime - Returns the current server date and time
// Description: This route is used to check if the server is up and running by returning the current date and time.
router.get("/server-time", getServerTime);

// Catch-all route to handle unmatched routes and redirect to /server-time
router.all("*", handleIncorrectEndpoint);

export default router; // Export the router object as the default export of the module