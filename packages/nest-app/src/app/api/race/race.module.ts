import { Module } from '@nestjs/common';
import { RaceController } from './controllers/race.controller';
import { RaceService } from './services/race.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race, RacialTrait } from '../common/models';

@Module({
    imports: [TypeOrmModule.forFeature([Race, RacialTrait])],
    controllers: [RaceController],
    providers: [RaceService],
    exports: [RaceService],
})
export class RaceModule {}
