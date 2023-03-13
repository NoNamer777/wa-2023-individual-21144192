import { Module } from '@nestjs/common';
import { RaceModule, TraitModule } from './api';
import { DatabaseProviderModule } from './configs';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { environment } from '../environments/environment';

const configOptions: ConfigModuleOptions = {
    load: [() => environment],
};

@Module({
    imports: [DatabaseProviderModule, ConfigModule.forRoot(configOptions), RaceModule, TraitModule],
    controllers: [AppController],
})
export class AppModule {}
