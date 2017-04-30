import 'reflect-metadata';

import { Server } from './web';


process.on('uncaughtException', (err: Error) => {
    console.log('Caught exception: ' + err); // tslint:disable-line:no-console
});


const server = new Server();
server.start();
