import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

interface EnvironmentValues {
    database?: MysqlConnectionOptions | SqliteConnectionOptions;
}

export const environment: EnvironmentValues = {};
