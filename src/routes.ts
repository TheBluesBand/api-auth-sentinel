import { Router } from "express"; // Import the Router class from the express package
import {
  verifyToken,
  getToken,
  protectedRoute,
  getServerTime,
  handleIncorrectEndpoint,
  tokenRateLimiter,
  protectedRouteRateLimiter,
} from "./controllers"; // Import the controller functions and middleware from controllers.ts

const router: Router = Router(); // Create a new router object

// Define the /token route
// Method: GET
// Handler: getToken - generates and returns a token, with rate limiting applied
router.get("/token", tokenRateLimiter, getToken);

// Define the /protected route
// Method: GET
// Middleware: verifyToken - Checks the validity of the token with rate limiting applied
// Handler: protectedRoute - Responds with a message if the user is authenticated
router.get(
  "/protected",
  protectedRouteRateLimiter,
  verifyToken,
  protectedRoute
);

// Define the /server-time route
// Method: GET
// Handler: getServerTime - Returns the current server date and time
// Description: This route is used to check if the server is up and running by returning the current date and time.
router.get("/server-time", getServerTime);

// Catch-all route to handle unmatched routes and redirect to /server-time
router.all("*", handleIncorrectEndpoint);

export default router; // Export the router object as the default export of the module
