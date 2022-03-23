const server = require('../server/app');
const request = require('supertest');
import { it, describe } from '@jest/globals';

describe('GET / - Testing for endpoint /', () => {
  it('Expect 200 OK', () => {
    const res = request(server).get('/');
    res.expect(200);
  });
});

describe('POST / - Testing for endpoint /create', () => {
  it('Create proper JSON format', () => {
    const res = request(server).post('/create').send('newData');
    res.expect(201);
  });
});

describe('PUT / - Testing for endpoint /update', () => {
  it('Update available data', () => {
    const res = request(server).put('/data/update/id').send('updFormat');
    res.expect(200);
  });
});

describe('DELETE / - Testing for endpoint /delete', () => {
  it('Delete available data', () => {
    const res = request(server).delete('/data/delete/id');
    res.expect(200);
  });
});
