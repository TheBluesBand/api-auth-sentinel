import { Request, Response, NextFunction } from "express"; // Import necessary types from the express package
import { randomInt } from "crypto";
import { TARGET, MODULO, TOKEN_LIFETIME_MS } from "./constants";
import rateLimit from "express-rate-limit";

//CAMERON - define rate limiting for the /token route
export const tokenRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Limit each IP to 10 requests per window
  message: "Too many requests for tokens, please try again later.",
});

//CAMERON - define rate limiting for the /protected route
export const protectedRouteRateLimiter = rateLimit({
  windowMs: 60 * 1000, //1 minute
  max: 5, // Limit each IP to 5 requests - THIS IS TOKEN VALIDATION
  message: "Too many token validation attempts, please try again later.",
});

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

  //CAMERON - split token and expiry
  const tokenParts = authHeader.split(":");
  
  //CAMERON - check both token and expiry present 
  if (tokenParts.length !== 2) {
    console.log("Token or expiration time missing");
    res.sendStatus(401);
    return;
  }

  const [tokenStr, expirationStr] = tokenParts;
  const token: number = parseInt(tokenStr, 10);
  const expirationTime: number = parseInt(expirationStr, 10);

  //CAMERON - check if the expiration time is a valid number
  if (isNaN(expirationTime)) {
    console.log("Invalid or missing expiration time");
    res.sendStatus(401);
    return;
  }

  //CAMERON - is token expired
  if (Date.now() > expirationTime) {
    console.log("Token expired");
    res.sendStatus(401);
    return;
  }

  if (!isNaN(token) && token % MODULO === TARGET) {
    next();
  } else {
    res.sendStatus(401);
    return;  //CAMERON - stop the flow here if the token is invalid
  }
};

// Function to generate a token that satisfies the modulo condition and includes an expiration time
export function generateToken(): string {
  let token: number;
  do {
    token = randomInt(100000, 1000000); // Generate a random number between 100000 and 999999
  } while (token % MODULO !== TARGET);

  const expirationTime = Date.now() + TOKEN_LIFETIME_MS; //CAMERON - set token expiration time 
  return `${token}:${expirationTime}`;
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
        description: "Protected route that requires authentication header and token",
      },
      {
        method: "GET",
        path: "/server-time",
        description: "Returns the current server date and time",
      },
    ],
  });
};