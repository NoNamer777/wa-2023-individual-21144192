import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

interface ServerEnvironmentValues {
    host: string;
    port?: number;
    secure?: boolean;
}

interface EnvironmentValues {
    database?: MysqlConnectionOptions;
    server?: ServerEnvironmentValues;
}

export const environment: EnvironmentValues = {};
