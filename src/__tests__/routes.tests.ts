import request from 'supertest';
import express from 'express';
import router from '../routes';

const app = express();
app.use('/', router);

describe('GET /server-time', () => {
    it('should return the current server date and time', async () => {
      const response = await request(app).get('/server-time');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('currentTime');
    });
  });
  
  describe('GET /token', () => {
    it('should return a token', async () => {
      const response = await request(app).get('/token');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });