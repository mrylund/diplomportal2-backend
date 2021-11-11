import { Request, Response } from "express"
import { User } from './login/user'
import { JWTHandler } from './login/jwtHandler'
import { prisma } from './main'
import { LogIn } from "./login/logIn"

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


export const createCourse = async (req: Request, res: Response) => {
    const course = await prisma.courses.create({
        data: {
            coursenumber: req.body.courseNumber,
            title: req.body.title,
            weekday: req.body.weekDay,
            sheets: req.body.sheets
        }
    });
    course
    ? res.json(course)
    : res.status(400).send({
        message: `Could not create course.`
    })
}
// 1SxaB7WiuMFWqgWu3OuKJPc2hZ9_7tzLH58we0bhvDoo

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


// This should be used but does not work GG (now we hardcoded the /verifyticket url :)
// export const logIn = async (req: Request, res: Response) => {
//     console.log('jeg logger ind i backend')
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.redirect('https://auth.dtu.dk/dtu/?service=http://localhost:443/verifyticket')
// }

// export const logIn = async (req: Request, res: Response) => {
//     res.redirect('https://auth.dtu.dk/dtu/?service=http://localhost:443/getuser')
// }

export const test = async (req: Request, res: Response) => {
    const ticket = req.query.ticket
    console.log(ticket)
    res.redirect(process.env.FRONTEND_URL)
}


export const logIn = async (req: Request, res: Response) => {
    console.log("start login backend")
    const logIn = new LogIn()
    const ticket = req.query.ticket
    const token = (await logIn.getUser(ticket))
    // Append the token in the URL
    res.redirect(process.env.FRONTEND_URL + '?token=' + token)
}

