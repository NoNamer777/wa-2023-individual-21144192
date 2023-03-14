import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

interface EnvironmentValues {
    database?: MysqlConnectionOptions;
}

export const environment: EnvironmentValues = {};
