import { User } from './user'
import * as jwt from "jsonwebtoken"
import { Request } from "express"


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

    authorizeUser(req: Request) {
        const token = req.body.authorization
        return token
        ? this.verifyToken(token)
        : false
    }

    // Returns true if the token can be decoded
    verifyToken(token: any) {
        return !!this.getStudynumberFromToken(token)
    }

    getStudynumberFromToken(token: any) {
        try {
            const decoded = jwt.verify(token, this.key)
            return decoded.sub as string
        } catch (e) {
            return ''
        }
    }

    getStudynumberFromRequest(req: Request) {
        const token = this.getTokenFromRequest(req)
        return this.getStudynumberFromToken(token)
    }

    getTokenFromRequest(req: Request) {
        const bearerHeader = req.body.authorization
        return bearerHeader || ''
    }

}