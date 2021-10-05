"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes_1 = require("./routes");
const cors = require("cors");
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
};
class WebServer {
    app;
    closer;
    constructor() {
        this.app = express();
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.get('/', (req, res) => {
            res.send('hej');
        });
        this.app.get('/courses', routes_1.getCourses);
        this.app.get('/courses/:id', routes_1.getCourseById);
        this.app.get('/students', routes_1.getStudents);
        this.app.get('/students/:id', routes_1.getStudentById);
        // Basic error handling
        this.app.use((err, _req, res, next) => {
            if (err) {
                if (!err.statusCode)
                    err.statusCode = 500; // Set 500 server code error if statuscode not set
                return res.status(err.statusCode).send({
                    statusCode: err.statusCode,
                    message: err.message
                });
            }
            return next();
        });
        this.app.use((_req, res) => {
            res.status(404).send('404: Page not found.');
        });
    }
    start(port) {
        return new Promise((resolve) => {
            const server = this.app.listen(port, resolve);
            this.closer = () => new Promise((resolve) => {
                server.close(() => resolve());
            });
        });
    }
    stop() {
        return this.closer();
    }
}
exports.default = WebServer;
//# sourceMappingURL=webserver.js.map