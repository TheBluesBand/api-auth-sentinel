import { Request, Response, NextFunction } from "express"; // Import necessary types from the express package
import { randomInt } from "crypto";
import { TARGET, MODULO } from "./constants";

// Middleware to verify the token
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader: string | undefined = req.headers["authorization"];
  if (!authHeader) {
    res.sendStatus(401);
    return;
  }

  const token: number = parseInt(authHeader, 10);
  console.log("Token:", token);
  if (!isNaN(token) && token % MODULO === TARGET) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// Function to generate a token that satisfies the modulo condition
function generateToken(): string {
  let token: number;
  do {
    token = randomInt(100000, 1000000); // Generate a random number between 100000 and 999999
  } while (token % MODULO !== TARGET);
  return token.toString();
}

// Controller to return a token
export const getToken = (req: Request, res: Response) => {
  const token: string = generateToken(); // Static token (replace with dynamic token generation in a real app)
  res.json({ token }); // Respond with the token as a JSON object
};

// Controller for the protected route
export const protectedRoute = (req: Request, res: Response) => {
  res.send(`Hello! You are authenticated.`); // Respond with a message indicating the user is authenticated
};

// Controller to return the current date and time
export const getServerTime = (req: Request, res: Response) => {
  const currentTime: Date = new Date(); // Get the current date and time
  res.json({ currentTime }); // Respond with the current date and time as a JSON object
};

// Controller to handle incorrect endpoints
export const handleIncorrectEndpoint = (req: Request, res: Response) => {
  res.status(404).json({
    message: "You have hit an incorrect endpoint.",
    availableEndpoints: [
      {
        method: "GET",
        path: "/token",
        description: "Generates and returns a token",
      },
      {
        method: "GET",
        path: "/protected",
        description:
          "Protected route that requires authentication header and token",
      },
      {
        method: "GET",
        path: "/server-time",
        description: "Returns the current server date and time",
      },
    ],
  });
};
