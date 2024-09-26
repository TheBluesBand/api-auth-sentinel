import { Request, Response, NextFunction } from "express"; // Import necessary types from the express package

// Middleware to verify the token
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization header:', authHeader);
  if (!authHeader) {
    console.log('Authorization header missing');
    res.sendStatus(401);
    return;
  }

  const token = parseInt(authHeader, 10);
  const modulo = 7;
  const target = 3;
  console.log('Token:', token);
  if (!isNaN(token) && token % modulo === target) {
    console.log('Token is valid');
    next();
  } else {
    console.log('Token is invalid');
    res.sendStatus(401);
  }
};

// Function to generate a token that satisfies the modulo condition
function generateToken(): string {
  const modulo = 7; // Hardcoded modulo value
  const target = 3; // Hardcoded target value
  let token: number;
  do {
    token = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
  } while (token % modulo !== target);
  return token.toString();
}

// Controller to return a token
export const getToken = (req: Request, res: Response) => {
  const token = generateToken(); // Static token (replace with dynamic token generation in a real app)
  res.json({ token }); // Respond with the token as a JSON object
}

// Controller for the protected route
export const protectedRoute = (req: Request, res: Response) => {
  res.send(`Hello! You are authenticated.`); // Respond with a message indicating the user is authenticated
}

// Controller to return the current date and time
export const getServerTime = (req: Request, res: Response) => {
  const currentTime = new Date(); // Get the current date and time
  res.json({ currentTime }); // Respond with the current date and time as a JSON object
}