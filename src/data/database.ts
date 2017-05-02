import 'reflect-metadata'; // for typeorm
import { Connection, ConnectionOptions, createConnection, DriverOptions, ObjectType } from 'typeorm';


class Database {

    private connection: Connection;
    private entities: any[] = [];

    constructor(
        public name: string = 'wave',
    ) {}


    public registerEntity<T>(entityCtor: ObjectType<T>) {
        this.entities.push(entityCtor);
    }

    public getConnectionOptions(): DriverOptions {
        return {
            database: this.name,
            host: process.env.DATABASE_HOST || 'localhost',
            password: 'app',
            port: 5432,
            type: 'postgres',
            username: 'app',
        };
    }

    public async getConnection() {
        if (!this.connection) {
            const connectOptions = this.getConnectionOptions();
            const options: ConnectionOptions = {
                autoSchemaSync: true,
                driver: connectOptions,
                entities: this.entities,
                name: connectOptions.database,
            };
            this.connection = await createConnection(options);
        }
        return this.connection;
    }
}


export { Database };
