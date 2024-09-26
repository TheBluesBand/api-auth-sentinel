import express, { Request, Response, NextFunction } from "express";

const app: express.Application = express();
const port: number = 3000;

// Middleware to verify the token
const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    next();
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

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
