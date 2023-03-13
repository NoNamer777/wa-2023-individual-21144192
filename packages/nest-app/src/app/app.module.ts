import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { RaceModule, TraitModule } from './api';
import { DatabaseProviderModule } from './configs';
import { environment } from '../environments/environment';

const configOptions: ConfigModuleOptions = {
    load: [() => environment],
};

@Module({
    imports: [DatabaseProviderModule, ConfigModule.forRoot(configOptions), RaceModule, TraitModule],
})
export class AppModule {}
