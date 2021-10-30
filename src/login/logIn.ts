import axios from 'axios'
import { JWTHandler } from './jwtHandler'

export class LogIn {

    dtuLogin = async (ticket: any) => {
        const validationUrl = "https://auth.dtu.dk/dtu/validate?service=http://localhost:443/login&ticket=" + ticket
        const response = await axios.get(validationUrl)
        // If the user is valid
        if ((response.data as string).includes('yes')) {
            const studynumber = (response.data as string).split('\n')[1].trim()
            const jwtHandler = new JWTHandler()
            const token = jwtHandler.generateJwtToken(studynumber)
            return {
                token: token,
                url: 'http://localhost:3000'
            }
        } else {
            // dræb
            return {
                message: 'Not a valid user.'
            }
        }
    }

}