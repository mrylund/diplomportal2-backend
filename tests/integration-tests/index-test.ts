import { PrismaClient } from "@prisma/client"

import 'jest';
import * as express from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import IntegrationHelpers from '../helpers/Integration-helper';

const request = require("supertest");


describe('Index route tests', () => {
    let app: express.Application;

    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
    });


    test("Check if index works", done => {
      request(app)
          .get("/")
          .expect({message: 'Diplompotal 2.0 backend'})
          .expect(200, done);
    });
});
