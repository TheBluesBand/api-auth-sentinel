import express, { Request, Response, NextFunction } from "express";

const app: express.Application = express();
const port: number = 3000;

// Middleware to verify the token
const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = "CSCI262"; // Expected token

  if (authHeader && authHeader === token) {
    next();
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

// Route to return a token
app.get("/token", (req: Request, res: Response) => {
  const token = "CSCI262"; // Replace with dynamic token generation in a real app
  res.json({ token });
});

//Curl command to send the token
// curl -H "Authorization: CSCI262" http://localhost:3000/protected

// Protected route (requires authentication)
app.get(
  "/protected",
  verifyToken,
  (req: express.Request, res: express.Response) => {
    res.send(`Hello! You are authenticated.`);
  }
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
