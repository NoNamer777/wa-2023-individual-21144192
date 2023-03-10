import { Module } from '@nestjs/common';
import { RaceController } from './controllers/race.controller';
import { RaceService } from './services/race.service';

@Module({
    controllers: [RaceController],
    providers: [RaceService],
})
export class RaceModule {}
