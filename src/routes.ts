import { Request, Response } from "express"
import * as dummy from "./dummy"
import { User } from './login/user'
import { JWTHandler } from './login/jwtHandler'
import { prisma } from './main'

export const getCourses = async (req: Request, res: Response) => {
    const courses = await prisma.courses.findMany()
    courses
    ? res.json(courses)
    : res.status(400).send({
        message: 'Could not fetch courses.'
    })
}

export const getCourseById = async (req: Request, res: Response) => {
    const course = await prisma.courses.findFirst({ where: { coursenumber: req.params.id } })
    course
    ? res.json(course)
    : res.status(400).send({
        message: `Could not fetch course with id ${req.params.id}.`
    })
}

export const getStudents = async (req: Request, res: Response) => {
    const students = await prisma.students.findMany()
    students
    ? res.json(students)
    : res.status(400).send({
        message: 'Could not fetch students.'
    })
}

export const getStudentById = async (req: Request, res: Response) => {
    const student = await prisma.students.findFirst({ where: { studynumber: req.params.id } })
    student
    ? res.json(student)
    : res.status(400).send({
        message: `Could not fetch student with studyNumber ${req.params.id}.`
    })
}


export const generateJwtToken = async (req: Request, res: Response) => {
    const user = new User("Patrick", "hej123", "p@hej.dk")
    const jwtHandler = new JWTHandler()
    res.json(jwtHandler.generateJwtToken(user))
}