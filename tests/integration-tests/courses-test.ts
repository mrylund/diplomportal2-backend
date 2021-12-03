import { PrismaClient } from "@prisma/client"

import 'jest';
import * as express from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import IntegrationHelpers from '../helpers/Integration-helper';

const request = require("supertest");


describe('Courses route tests', () => {
    let app: express.Application;

    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
        const prisma = new PrismaClient()
        await prisma.courses.deleteMany({})
        await prisma.students.deleteMany({})

        await prisma.courses.createMany({
            data: [
                {
                    id: 1,
                    courseNumber: '62582',
                    title: 'Complex Systems and Devops',
                    weekDay: 'Tuesday',
                    sheetsId: 'none',
                    startTime: '08:00',
                    endTime: '12:00'
                },
                {
                    id: 2,
                    courseNumber: '62598',
                    title: 'Artificial intelligence in computer games',
                    weekDay: 'Tuesday',
                    sheetsId: 'none',
                    startTime: '13:00',
                    endTime: '17:00'
                },
                {
                    id: 3,
                    courseNumber: '62407',
                    title: 'Internet of Things - Theory and Practice',
                    weekDay: 'Thursday',
                    sheetsId: 'none',
                    startTime: '08:00',
                    endTime: '12:00'
                },
                {
                    id: 3,
                    courseNumber: '02323',
                    title: 'Introduction to Statistics',
                    weekDay: 'Friday',
                    sheetsId: 'none',
                    startTime: '08:00',
                    endTime: '12:00'
                },
            ],
        });


    });


    test("Get all courses", done => {
        request(app)
            .get("/courses")
            .expect(
                [
                    {
                      id: 1,
                      courseNumber: '62582',
                      title: 'Complex Systems and Devops',
                      weekDay: 'Tuesday',
                      sheetsId: 'none',
                      timeSlot: null,
                      startTime: '08:00',
                      endTime: '12:00'
                    },
                    {
                      id: 2,
                      courseNumber: '62598',
                      title: 'Artificial intelligence in computer games',
                      weekDay: 'Tuesday',
                      sheetsId: 'none',
                      timeSlot: null,
                      startTime: '13:00',
                      endTime: '17:00'
                    },
                    {
                      id: 3,
                      courseNumber: '62407',
                      title: 'Internet of Things - Theory and Practice',
                      weekDay: 'Thursday',
                      sheetsId: 'none',
                      timeSlot: null,
                      startTime: '08:00',
                      endTime: '12:00'
                    },
                    {
                      id: 3,
                      courseNumber: '02323',
                      title: 'Introduction to Statistics',
                      weekDay: 'Friday',
                      sheetsId: 'none',
                      timeSlot: null,
                      startTime: '08:00',
                      endTime: '12:00'
                    }
                  ]
            )
            .expect(200, done);
    });

    test("Get course 62582", done => {
        request(app)
            .get("/courses/62582")
            .expect(
                {
                    id: 1,
                    courseNumber: '62582',
                    title: 'Complex Systems and Devops',
                    weekDay: 'Tuesday',
                    sheetsId: 'none',
                    timeSlot: null,
                    startTime: '08:00',
                    endTime: '12:00'
                }
            )
            .expect(200, done);
    });

    test("Get course 62598", done => {
        request(app)
            .get("/courses/62598")
            .expect(
                {
                    id: 2,
                    courseNumber: '62598',
                    title: 'Artificial intelligence in computer games',
                    weekDay: 'Tuesday',
                    sheetsId: 'none',
                    timeSlot: null,
                    startTime: '13:00',
                    endTime: '17:00'
                }
            )
            .expect(200, done);
    });

    test("Get non existing course", done => {
        request(app)
            .get("/courses/6000")
            .expect(
                {
                    message: `Could not fetch course with id 6000.`
                }
            )
            .expect(400, done);
    });


    test("Create course", done => {
        request(app).post("/courses").send({
            courseNumber: '1337',
            title: 'Budtz private course',
            weekDay: 'Friday',
            sheetsId: 'none',
        }).expect(200, done)
    })


    // TODO: Tests for current user, we have to mock current student data
});
