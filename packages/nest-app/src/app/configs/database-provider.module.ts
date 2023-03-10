import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                ...configService.get('database'),
                autoLoadEntities: true,
            }),
            dataSourceFactory: async (option) => await new DataSource(option).initialize(),
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseProviderModule {}
