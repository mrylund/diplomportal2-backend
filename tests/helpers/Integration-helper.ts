import * as express from 'express';
const serverRoutes = require("../../src/main"); //import file we are testing

export default class IntegrationHelpers {
    public static appInstance: express.Application;
    public static async getApp(): Promise<express.Application> {
        if (this.appInstance) {
            return this.appInstance;
        }
        const app = express();
        app.use(express.urlencoded({ extended: false }));

        app.use("/", serverRoutes.app);

        this.appInstance = app
        
        return app;
    }
}