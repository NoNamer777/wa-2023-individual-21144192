import { Module } from '@nestjs/common';
import { RaceModule, TraitModule } from './api';

@Module({
    imports: [RaceModule, TraitModule],
})
export class AppModule {}
