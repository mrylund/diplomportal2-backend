import * as express from 'express'
import { getCourseById, getCourses, getStudentById, getStudents, logIn } from './routes'
import * as cors from 'cors'
import { prisma } from './main'

const corsOptions = {
    origin: true,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

export default class WebServer {

    private readonly app: express.Express
    private closer: () => Promise<void>


    constructor() {
        this.app = express()
        this.app.use(cors(corsOptions))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.get('/', (req, res) => {
            res.send('hej')
        })
        this.app.get('/courses', getCourses)

        this.app.get('/courses/:id', getCourseById)

        this.app.get('/students', getStudents)

        this.app.get('/students/:id', getStudentById)

        this.app.get('/login', logIn)

        // Basic error handling
        this.app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (err) {
                if (!err.statusCode) err.statusCode = 500 // Set 500 server code error if statuscode not set
                return res.status(err.statusCode).send({
                    statusCode: err.statusCode,
                    message: err.message
                })
            }
            return next()
        })
        this.app.use((_req, res) => {
            res.status(404).send('404: Page not found.')
        })
    }
    start(port: number): Promise<void> {
        return new Promise<void>((resolve) => {
            const server = this.app.listen(port, resolve)
            this.closer = () => new Promise<void>((resolve) => {
                server.close(() => resolve())
            })
        })
    }

    stop(): Promise<void> {
        prisma.$disconnect()
        return this.closer()
    }
}