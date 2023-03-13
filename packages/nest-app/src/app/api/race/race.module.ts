import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceController } from './controllers/race.controller';
import { RaceService } from './services/race.service';
import { Race, RacialTrait } from '../common/models';

@Module({
    imports: [TypeOrmModule.forFeature([Race, RacialTrait])],
    controllers: [RaceController],
    providers: [RaceService],
    exports: [RaceService],
})
export class RaceModule {}
