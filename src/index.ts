import 'reflect-metadata';

import { startServer } from './http';


process.on('uncaughtException', (err: Error) => {
    console.log('Caught exception: ' + err); // tslint:disable-line:no-console
});

startServer();
