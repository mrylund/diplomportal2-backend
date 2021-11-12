import { prisma } from '../main'
import axios, { AxiosResponse } from 'axios'
import { getStudentById } from '../routes';
import { JWTHandler } from './jwtHandler'

const backend_url = process.env.NODE_ENV === 'development' ? "http://localhost:80/" : "https://" + process.env.BACKEND_URL;
console.log("env backend url:", process.env.BACKEND_URL)
console.log("backend url in use:", backend_url)

export class LogIn {

    /**
     * Verify a users ticket.
     * @param ticket The ticket dtu gives back as the login was called via frontend.
     * @returns The token if the users ticket is verified. "Not a valid user." if not.
     */
    getUser = async (ticket: any) => {
        console.log("getUser: ticket=", ticket)
        const validationUrl = 'https://auth.dtu.dk/dtu/validate?service=' + backend_url + 'login&ticket=' + ticket
        console.log("validate url:", validationUrl)
        const response = await axios.get(validationUrl)
        return this.createToken(response)
    }


    /**
     * Creates a JWT token used to return to the frontend.
     * @param response The response auth.dtu gives back. Either "yes <studie number>" or "no".
     * @returns A JWT token generated with the users studynumber.
     */
    createToken = async (response: AxiosResponse) => {
        console.log("verifyUser", response.data as string);
        
        // If the user is valid
        if ((response.data as string).includes('yes')) {
            const studynumber = (response.data as string).split('\n')[1].trim()
            this.createUserIfNotExist(studynumber)
            const jwtHandler = new JWTHandler()
            const token = jwtHandler.generateJwtToken(studynumber)
            return token
        } else {
            return 'Not a valid user.'
        }
    }

    createUserIfNotExist = async (studyNumber: string) => {
        const student = await prisma.students.findFirst({ where: { studynumber: studyNumber }})
        if (!student) {
            const newStudent = await prisma.students.create({
                data: {
                    name: '',
                    studynumber: studyNumber
                }
            });
            console.log("New student created:", newStudent)
        }
    }


}