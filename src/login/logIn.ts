import axios, { AxiosResponse } from 'axios'
import { JWTHandler } from './jwtHandler'

export class LogIn {

    dtuGetToken = async () => {

        const response = await axios.get('https://auth.dtu.dk/dtu/?service=http://localhost:443/login')
    }

    getUser = async (ticket: any) => {
        console.log("getUser: ticket=", ticket)
        const validationUrl = "https://auth.dtu.dk/dtu/validate?service=http://localhost:443/login&ticket=" + ticket
        const response = await axios.get(validationUrl)
        return this.verifyUser(response)
    }

    verifyUser = async (response: AxiosResponse) => {
        console.log("verifyUser", response.data as string);
        
        // If the user is valid
        if ((response.data as string).includes('yes')) {
            const studynumber = (response.data as string).split('\n')[1].trim()
            const jwtHandler = new JWTHandler()
            const token = jwtHandler.generateJwtToken(studynumber)
            return token
        } else {
            // dræb
            return {
                message: 'Not a valid user.'
            }
        }
    }

}