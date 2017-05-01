declare module "pgtools" {
    export function createdb(connection: {}, dbName: string): Promise<any>;
    export function dropdb(connection: {}, dbName: string): Promise<any>;
}