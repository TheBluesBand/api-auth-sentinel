import { Router } from "express"; // Import the Router class from the express package
import { verifyToken, getToken, protectedRoute, getServerTime, handleIncorrectEndpoint } from "./controllers"; // Import the controller functions and middleware from controllers.ts
import rateLimit from "express-rate-limit";

const router: Router = Router(); // Create a new router object

//CAMERON - define rate limiting for the /token route
const tokenRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Limit each IP to 10 requests per window
  message: "Too many requests for tokens, please try again later.",
});

//CAMERON - define rate limiting for the /protected route 
const protectedRouteRateLimiter = rateLimit({
  windowMs: 60 * 1000, //1 minute
  max: 5, // Limit each IP to 5 requests - THIS IS TOKEN VALIDATION
  message: "Too many token validation attempts, please try again later.",
});

// Define the /token route
// Method: GET
// Handler: getToken - generates and returns a token, with rate limiting applied
router.get("/token", tokenRateLimiter, getToken);

// Define the /protected route
// Method: GET
// Middleware: verifyToken - Checks the validity of the token with rate limiting applied
// Handler: protectedRoute - Responds with a message if the user is authenticated
router.get("/protected", protectedRouteRateLimiter, verifyToken, protectedRoute);

// Define the /server-time route
// Method: GET
// Handler: getServerTime - Returns the current server date and time
// Description: This route is used to check if the server is up and running by returning the current date and time.
router.get("/server-time", getServerTime);

// Catch-all route to handle unmatched routes and redirect to /server-time
router.all("*", handleIncorrectEndpoint);

export default router; // Export the router object as the default export of the module
