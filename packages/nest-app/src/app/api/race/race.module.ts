import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceController } from './controllers/race.controller';
import { RaceService } from './services/race.service';
import { RaceSchema } from './race.schema';
import { RaceTraitSchema } from './race-trait.schema';

@Module({
    imports: [TypeOrmModule.forFeature([RaceSchema, RaceTraitSchema])],
    controllers: [RaceController],
    providers: [RaceService],
    exports: [RaceService],
})
export class RaceModule {}
