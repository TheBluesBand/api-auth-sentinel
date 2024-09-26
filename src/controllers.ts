import { Request, Response, NextFunction } from "express"; // Import necessary types from the express package

// Middleware to verify the token
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"]; // Get the Authorization header from the request
  const token = "CSCI262"; // Expected token

  // Check if the Authorization header exists and matches the expected token
  if (authHeader && authHeader === token) {
    next(); // If the token is valid, proceed to the next middleware or route handler
  } else {
    res.sendStatus(401); // If the token is invalid, respond with a 401 Unauthorized status
  }
}

// Controller to return a token
export const getToken = (req: Request, res: Response) => {
  const token = "CSCI262"; // Static token (replace with dynamic token generation in a real app)
  res.json({ token }); // Respond with the token as a JSON object
}

// Controller for the protected route
export const protectedRoute = (req: Request, res: Response) => {
  res.send(`Hello! You are authenticated.`); // Respond with a message indicating the user is authenticated
}