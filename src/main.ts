import WebServer from "./webserver"
import { PrismaClient } from '@prisma/client'

const webServer = new WebServer()
const PORT = Number(process.env.PORT) || 80;
export const prisma = new PrismaClient();

if (process.env.NODE_ENV !== 'test') {
    (async () => {
            console.log('Initializing');
            await webServer.start(PORT);
            console.log('Started web server on port ' + PORT);
    })();
    }
// Serveren dør hvis exceptions ikke håndteres
process.on('uncaughtException', err => {
    console.error("Exit processing due to uncaught exception", err);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error(`Exit processing due to unhandledRejection`, reason, promise);
    process.exit(1);
});

module.exports = webServer