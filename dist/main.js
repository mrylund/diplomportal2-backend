"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webserver_1 = require("./webserver");
const webServer = new webserver_1.default();
const PORT = 443;
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
//# sourceMappingURL=main.js.map