import { Module } from '@nestjs/common';
import { RaceModule, TraitModule } from './api';
import { DatabaseProviderModule } from './configs';

@Module({
    imports: [DatabaseProviderModule, RaceModule, TraitModule],
})
export class AppModule {}
