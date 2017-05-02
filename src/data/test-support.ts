import * as pgtools from 'pgtools';
import { Database } from './database';


function getConnection(db: Database) {
    const config = db.getConnectionOptions();
    return {
        database: 'postgres',
        host: config.host,
        password: config.password,
        port: config.port,
        user: config.username,
    };
}

async function createDB(db: Database) {
    return await pgtools.createdb(getConnection(db), db.name);
}

async function deleteDB(db: Database) {
    return await pgtools.dropdb(getConnection(db), db.name);
}


export { createDB, deleteDB };
