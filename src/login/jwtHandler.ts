import { User } from './user'
import * as jwt from "jsonwebtoken"


export class JWTHandler {

    private key: string = 'hej';
    private TOKEN_EXPIRY: number = 2 * 60 * 60 // 2 hours in sec

    generateJwtToken(studynumber: string) {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + this.TOKEN_EXPIRY,
            data: "goddag"
        }, this.key, { algorithm: 'HS512', subject: studynumber} )

        return token
    }

    verifyJwtToken(token: any) {
        try {
            const decoded = jwt.verify(token, this.key)
        } catch (e) {
            return false
        }
        return true
    }

}