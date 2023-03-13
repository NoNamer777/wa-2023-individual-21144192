import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceController } from './controllers/race.controller';
import { RaceService } from './services/race.service';

@Module({
    controllers: [RaceController],
    providers: [RaceService],
    exports: [RaceService],
})
export class RaceModule {}
