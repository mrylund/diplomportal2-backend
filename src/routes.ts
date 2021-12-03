import { Request, Response } from "express"
import { User } from './login/user'
import { JWTHandler } from './login/jwtHandler'
import { prisma } from './main'
import { LogIn } from "./login/logIn"
import { buildSchedule } from "./schedule"
import { Course, Student } from "./interfaces"

/**
 * For all endpoints use jwtHandler.authorizeUser(req) with the request object from the function.
 * This is to verify that the user is who he/she said he/she is.
 * Should be called like:
 */
/*
    if (jwtHandler.authorizeUser(req)) {
        do stuff
    } else {
        res.status(403).send({
            message: notAuthorizedErrorMessage
       })
    }
*/
const jwtHandler = new JWTHandler()
const notAuthorizedErrorMessage = 'Access denied. Token is invalid.'

export const authenticateUserToken = async (req: Request, res: Response) => {
    jwtHandler.authorizeUser(req)
    ? res.sendStatus(200)
    : res.status(403).send({
        message: notAuthorizedErrorMessage
    })
}

export const getCourses = async (req: Request, res: Response) => {
    const courses = await prisma.courses.findMany()
    courses
    ? res.json(courses)
    : res.status(400).send({
        message: 'Could not fetch courses.'
    })
}

export const getCourseById = async (req: Request, res: Response) => {
    const course = await prisma.courses.findFirst({ where: { courseNumber: req.params.id } })
    course
    ? res.json(course)
    : res.status(400).send({
        message: `Could not fetch course with id ${req.params.id}.`
    })
}


export const createCourse = async (req: Request, res: Response) => {
    const course = await prisma.courses.create({
        data: {
            courseNumber: req.body.courseNumber,
            title: req.body.title,
            weekDay: req.body.weekDay,
            sheetsId: req.body.sheetsId
        }
    });
    course
    ? res.json(course)
    : res.status(400).send({
        message: `Could not create course.`
    })
}

export const getStudents = async (req: Request, res: Response) => {
    const students = await prisma.students.findMany({ include: { courses: true } })
    students
    ? res.json(students)
    : res.status(400).send({
        message: 'Could not fetch students.'
    })
}

export const getStudentById = async (req: Request, res: Response) => {
    const student = await prisma.students.findFirst({ where: { studyNumber: req.params.id }, include: { courses: true} })

    if (!student) {
        res.status(400).send({
            message: `Could not fetch student with studyNumber ${req.params.id}.`
        })
        return
    }

    const hej: Student = {
        name: student.name,
        studyNumber: student.studyNumber,
        courses: student.courses as unknown as Course[],
        schedule: {}
    }
    const schedule = buildSchedule(hej)

    student
    ? res.json({...student, schedule})
    : res.status(400).send({
        message: `Could not fetch student with studyNumber ${req.params.id}.`
    })
}

export const getCurrentUser = async (req: Request, res: Response) => {
    if (jwtHandler.authorizeUser(req)) {
        const token = jwtHandler.getTokenFromRequest(req)
        const studyNumber = jwtHandler.getStudynumberFromToken(token)
        const curUser = await prisma.students.findFirst({ where: { studyNumber: studyNumber }, include: { courses: true } })
        const curStudent: Student = {
            name: curUser.name,
            studyNumber: curUser.studyNumber,
            courses: curUser.courses as unknown as Course[],
            schedule: {}
        }
        const schedule = buildSchedule(curStudent)
        curUser
        ? res.json({...curUser, schedule})
        : res.status(400).send({
            message: 'Could not fetch current user.'
        })
    } else {
        res.status(403).send({
            message: notAuthorizedErrorMessage
        })
    }
}

export const createStudent = async (req: Request, res: Response) => {
    const student = await prisma.students.create({
        data: {
            name: req.body.name,
            studyNumber: req.body.studyNumber
        }
    });
    student
    ? res.json(student)
    : res.status(400).send({
        message: `Could not create student.`
    })
}

export const updateStudentName = async (req: Request, res: Response) => {
    if (jwtHandler.authorizeUser(req)) {
        const currentUserStudyNumber = jwtHandler.getStudynumberFromRequest(req)
        const student = await prisma.students.update({
            where: {
                studyNumber: currentUserStudyNumber
            },
            data: {
                name: req.body.name
            }
        });
        student
        ? res.json(student)
        : res.status(400).send({
            message: `Could not update the student with id ${currentUserStudyNumber}.`
        })
    } else {
        res.status(403).send({
            message: notAuthorizedErrorMessage
        })
    }
    
}

export const addStudentToCourse = async (req: Request, res: Response) => {
    if (jwtHandler.authorizeUser(req)) {
        const currentUserStudyNumber = jwtHandler.getStudynumberFromRequest(req)
        const student = await prisma.students.findFirst({ where: { studyNumber: currentUserStudyNumber }, include: { courses: true } })
        const course = await prisma.courses.findFirst({ where: { courseNumber: req.body.id } })
        if (student && course) {
            student.courses.push(course)
            await prisma.students.update({
                where: {
                    studyNumber: currentUserStudyNumber
                },
                data: {
                    courses: {
                        connect: {id: course.id}
                    }
                }
            })
            res.json({
                message: 'Student added to course.'
            })
        } else {
            res.status(400).send({
                message: `Could not add student to course.`
            })
        }
    } else {
        res.status(403).send({
            message: notAuthorizedErrorMessage
        })
    }
}

export const elevateUser = async (req: Request, res: Response) => {
    const user = await prisma.students.update({
        where: {
            studyNumber: req.params.id
        }, 
        data: {
            isAdmin: true
        }
    })
    user
    ? res.json(user)
    : res.status(400).send({
        message: `Could not elevate user with id ${req.params.id}.`
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



export const logIn = async (req: Request, res: Response) => {
    const logIn = new LogIn()
    const ticket = req.query.ticket
    const token = (await logIn.getUser(ticket))
    // Append the token in the URL
    res.redirect(process.env.FRONTEND_URL + '?token=' + token)
}

