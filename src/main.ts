import WebServer from "./webserver"

const webServer = new WebServer()
const PORT = Number(process.env.PORT) || 443;

(async () => {
        console.log('Initializing');
        await webServer.start(PORT);
        console.log('Started web server on port ' + PORT);
})();

// Serveren dør hvis exceptions ikke håndteres
process.on('uncaughtException', err => {
    console.error("Exit processing due to uncaught exception", err);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error(`Exit processing due to unhandledRejection`, reason, promise);
    process.exit(1);
});