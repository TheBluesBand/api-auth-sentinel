import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import { getToken, verifyToken } from "../controllers";
import router from "../routes";
import { generateToken } from "../controllers";

const app = express();
app.use("/", router);

describe("GET /token", () => {
  it("should return a token that satisfies the modulo condition", async () => {
    const response = await request(app).get("/token");
    const token = response.body.token;
    const colonIndex = token.indexOf(":");
    expect(token.substring(0, colonIndex) % 7).toBe(3); // Check if the token satisfies the condition
  });
});

describe("verifyToken middleware", () => {
  it("should call next if the token is valid", () => {
    const validToken = generateToken();
    const req = {
      headers: {
        authorization: validToken, // Example token that satisfies the condition
      },
    } as unknown as Request;
    const res = {
      sendStatus: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    verifyToken(req, res, next);

    expect(next).toHaveBeenCalled(); // Check if next was called
    expect(res.sendStatus).not.toHaveBeenCalled(); // Check if sendStatus was not called
  });

  it("should respond with 401 if the token is invalid", () => {
    const req = {
      headers: {
        authorization: "797688:1", // Example token that does not satisfy the condition
      },
    } as unknown as Request;
    const res = {
      sendStatus: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    verifyToken(req, res, next);

    expect(next).not.toHaveBeenCalled(); // Check if next was not called
    expect(res.sendStatus).toHaveBeenCalledWith(401); // Check if sendStatus was called with 401
  });

  it("should respond with 401 if the authorization header is missing", () => {
    const req = {
      headers: {},
    } as unknown as Request;
    const res = {
      sendStatus: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    verifyToken(req, res, next);

    expect(next).not.toHaveBeenCalled(); // Check if next was not called
    expect(res.sendStatus).toHaveBeenCalledWith(401); // Check if sendStatus was called with 401
  });
});

describe("GET /server-time", () => {
  it("should return the current server date and time", async () => {
    const response = await request(app).get("/server-time");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("currentTime");
  });
});

describe("Handle Incorrect Endpoints /handleIncorrectEndpoint", () => {
  it("should return 404 and list available endpoints", async () => {
    const response = await request(app).get("/non-existent-endpoint");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
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
  });
});
