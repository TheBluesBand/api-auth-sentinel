import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { getToken, verifyToken } from '../controllers';
import router from '../routes';

const app = express();
app.use('/', router);

describe('GET /token', () => {
  it('should return a token that satisfies the modulo condition', async () => {
    const response = await request(app).get('/token');
    const token = response.body.token;
    expect(token % 7).toBe(3); // Check if the token satisfies the condition
  });
});

describe('verifyToken middleware', () => {
  it('should call next if the token is valid', () => {
    const req = {
      headers: {
        authorization: '1000002' // Example token that satisfies the condition
      }
    } as unknown as Request;
    const res = {
      sendStatus: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    verifyToken(req, res, next);

    expect(next).toHaveBeenCalled(); // Check if next was called
    expect(res.sendStatus).not.toHaveBeenCalled(); // Check if sendStatus was not called
  });

  it('should respond with 401 if the token is invalid', () => {
    const req = {
      headers: {
        authorization: '1000004' // Example token that does not satisfy the condition
      }
    } as unknown as Request;
    const res = {
      sendStatus: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    verifyToken(req, res, next);

    expect(next).not.toHaveBeenCalled(); // Check if next was not called
    expect(res.sendStatus).toHaveBeenCalledWith(401); // Check if sendStatus was called with 401
  });

  it('should respond with 401 if the authorization header is missing', () => {
    const req = {
      headers: {}
    } as unknown as Request;
    const res = {
      sendStatus: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    verifyToken(req, res, next);

    expect(next).not.toHaveBeenCalled(); // Check if next was not called
    expect(res.sendStatus).toHaveBeenCalledWith(401); // Check if sendStatus was called with 401
  });
});

describe('GET /server-time', () => {
  it('should return the current server date and time', async () => {
    const response = await request(app).get('/server-time');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('currentTime');
  });
});
