import { PrismaClient } from "@prisma/client"

import 'jest';
import * as express from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import IntegrationHelpers from '../helpers/Integration-helper';

const request = require("supertest");


describe('Student route tests', () => {
    let app: express.Application;

    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
        const prisma = new PrismaClient()
        await prisma.courses.deleteMany({})
        await prisma.students.deleteMany({})

        await prisma.students.createMany({
            data: [
                {
                    id: 1,
                    name: 'Martin Rylund',
                    studyNumber: 's185107',
                    isAdmin: true,
                },
                {
                    id: 2,
                    name: 'Athusan Kugathasan',
                    studyNumber: 's185098',
                    isAdmin: true,
                },
                {
                    id: 3,
                    name: 'Rasmus Jakobsen',
                    studyNumber: 's152716',
                    isAdmin: false,
                },
                {
                    id: 4,
                    name: 'Patrick Hansen',
                    studyNumber: 's185092',
                    isAdmin: false,
                },
                {
                    id: 5,
                    name: 'Keith Birongo',
                    studyNumber: 's173945',
                    isAdmin: false,
                },
            ],
        });
    });


    test("Get all students", done => {
        request(app)
            .get("/students")
            .expect(
                [
                    {
                    id: 1,
                    name: 'Martin Rylund',
                    studyNumber: 's185107',
                    isAdmin: true,
                    courses: []
                    },
                    {
                    id: 2,
                    name: 'Athusan Kugathasan',
                    studyNumber: 's185098',
                    isAdmin: true,
                    courses: []
                    },
                    {
                    id: 3,
                    name: 'Rasmus Jakobsen',
                    studyNumber: 's152716',
                    isAdmin: false,
                    courses: []
                    },
                    {
                    id: 4,
                    name: 'Patrick Hansen',
                    studyNumber: 's185092',
                    isAdmin: false,
                    courses: []
                    },
                    {
                    id: 5,
                    name: 'Keith Birongo',
                    studyNumber: 's173945',
                    isAdmin: false,
                    courses: []
                    }
                ]
            )
            .expect(200, done);
    });

    test("Get specific student s185107", done => {
        request(app)
            .get("/students/s185107")
            .expect(
                {
                    id: 1,
                    name: 'Martin Rylund',
                    studyNumber: 's185107',
                    isAdmin: true,
                    courses: [],
                    schedule: []
                }
            )
            .expect(200, done);
    });

    test("Get specific student s185098", done => {
        request(app)
            .get("/students/s185098")
            .expect(
                {
                    id: 2,
                    name: 'Athusan Kugathasan',
                    studyNumber: 's185098',
                    isAdmin: true,
                    courses: [],
                    schedule: []
                }
            )
            .expect(200, done);
    });

    test("Get non existing student", done => {
        request(app)
            .get("/students/s100000")
            .expect(
                {
                    message: `Could not fetch student with studyNumber s100000.`
                }
            )
            .expect(400, done);
    });


    // TODO: Tests for current user, we have to mock current student data
});
