import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { environment } from '../environments/environment';
import { RaceModule, TraitModule } from './api';
import { AssetHandlingModule } from './asset-handling';
import { DatabaseProviderModule } from './configs';

const configOptions: ConfigModuleOptions = {
    load: [() => environment],
};

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        DatabaseProviderModule,
        AssetHandlingModule,
        RaceModule,
        TraitModule,
    ],
})
export class AppModule {}
