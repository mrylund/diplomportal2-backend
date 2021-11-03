

export class User {
    constructor(userName: string, password: string, email: string) {
        this.userName = userName
        this.password = password
        this.email = email
    }

    userName: string
    password: string
    email: string

    id: number
    createdDate: Date
}