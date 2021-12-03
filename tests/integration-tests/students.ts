import { PrismaClient } from "@prisma/client"

const serverRoutes = require("../../src/main"); //import file we are testing

const request = require("supertest");
const express = require("express");
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use("/", serverRoutes.app);



test("index route works", done => {
  request(app)
    .get("/")
    .expect({message: 'Diplompotal 2.0 backend'})
    .expect(200, done);
});

serverRoutes.stop()
