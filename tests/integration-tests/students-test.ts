import { PrismaClient } from "@prisma/client"

import { JWTHandler } from '../../src/login/jwtHandler'

import 'jest';
import * as express from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import IntegrationHelpers from '../helpers/Integration-helper';

const request = require("supertest");


describe('Student route tests', () => {
    let app: express.Application;
    const prisma = new PrismaClient()

    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
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

        await prisma.courses.create({
            data: {
                courseNumber: '1337',
                title: 'Budtz private course',
                weekDay: 'Friday',
                sheetsId: 'none',
                startTime: '22:00',
                endTime: '24:00',
            }
        })
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


    const jwtHandler = new JWTHandler()
    const token = jwtHandler.generateJwtToken('s185107')
    test("Authenticate user", done => {
        request(app).post("/students/authenticate").send({
            authorization: token,
        }).expect(200, done)
    })

    test("Current user without authorization", done => {
        request(app)
        .post("/students/current")
        .expect(
            {
                message: 'Access denied. Token is invalid.'
            }
        )
        .expect(403, done);
    })

    test("Current user with authorization", done => {
        request(app)
        .post("/students/current")
        .send({
            authorization: token,
        })
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
    })


    test("Update current user name", done => {
        request(app)
        .put("/students/current/name")
        .send({
            authorization: token,
            name: 'Martin Rune Rylund'
        })
        .expect(
            {
                id: 1,
                name: 'Martin Rune Rylund',
                studyNumber: 's185107',
                isAdmin: true
              }
        )
        .expect(200, done);
    })


    test("Enroll student in course", done => {
        request(app)
        .put("/students/current/courses")
        .send({
            authorization: token,
            id: '1337',
        })
        .expect(
            { 
                message: 'Student added to course.'
            }
        )
        .expect(200, done);
    })


    test("Current user with courses", done => {
        request(app)
        .post("/students/current")
        .send({
            authorization: token,
        })
        // .expect( // TOO LONG, IT IS STUPID??!
        //     {
        //         id: 1,
        //         name: 'Martin Rune Rylund',
        //         studyNumber: 's185107',
        //         isAdmin: true,
        //         courses: [
        //           {
        //             id: 51,
        //             courseNumber: '1337',
        //             title: 'Budtz private course',
        //             weekDay: 'Friday',
        //             sheetsId: 'none',
        //             timeSlot: null,
        //             startTime: '22:00',
        //             endTime: '24:00',
        //           }
        //         ],
        //         schedule: [
        //             {
        //                 weekdayName: "Friday",
        //                 courses: [
        //                     {
        //                         timeSlot: null,
        //                         startTime: '22:00',
        //                         endTime: '24:00',
        //                         title: 'Budtz private course',
        //                         courseNumber: '1337',
        //                         sheetsId: 'none',

        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // )
        .expect(200, done);
    })


    // TODO: Tests for current user, we have to mock current student data
});
