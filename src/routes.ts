import { Request, Response } from "express"
import * as dummy from "./dummy"


export const getCourses = async (req: Request, res: Response) => {
    // Hentes fra db senere, bla bla
    const courses = dummy.courses
    courses
    ? res.json(courses)
    : res.status(400).send({
        message: 'Could not fetch courses.'
    })
}

export const getCourseById = async (req: Request, res: Response) => {
    const course = dummy.courses.find(course => course.courseNumber === req.params.id)
    course
    ? res.json(course)
    : res.status(400).send({
        message: `Could not fetch course with id ${req.params.id}.`
    })
}

export const getStudents = async (req: Request, res: Response) => {
    const students = dummy.students
    students
    ? res.json(students)
    : res.status(400).send({
        message: 'Could not fetch students.'
    })
}

export const getStudentById = async (req: Request, res: Response) => {
    const student = dummy.students.find(student => student.studyNumber === req.params.id)
    student
    ? res.json(student)
    : res.status(400).send({
        message: `Could not fetch student with id ${req.params.id}.`
    })
}