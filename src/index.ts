import express from "express";

const app = express();
const port = 3000;

// Middleware to verify the token
const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    next();
  } else {
    return res.sendStatus(401); // Unauthorized
  }
};

// Protected route (requires authentication)
app.get("/protected", verifyToken, (req, res) => {
  res.send(`Hello! You are authenticated.`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
