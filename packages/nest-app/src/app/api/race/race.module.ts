import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceController } from './controllers/race.controller';
import { RaceSchema } from './race.schema';
import { RaceService } from './services/race.service';

@Module({
    imports: [TypeOrmModule.forFeature([RaceSchema])],
    controllers: [RaceController],
    providers: [RaceService],
    exports: [RaceService],
})
export class RaceModule {}
