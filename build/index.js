"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var http_1 = require("./http");
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err); // tslint:disable-line:no-console
});
http_1.startServer();
//# sourceMappingURL=index.js.map