import { Module } from '@nestjs/common';
import { RaceModule } from './api';

@Module({
    imports: [RaceModule],
})
export class AppModule {}
