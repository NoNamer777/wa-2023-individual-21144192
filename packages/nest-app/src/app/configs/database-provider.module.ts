import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST ?? 'localhost',
            port: parseInt(process.env.DB_PORT) ?? 3306,
            database: process.env.DB_DATABASE ?? '',
            username: process.env.DB_USERNAME ?? '',
            password: process.env.DB_PASSWORD ?? '',
            synchronize: process.env.DB_SYNCHRONIZE === 'true' ?? false,
            autoLoadEntities: true,
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseProviderModule {}
