import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RacialTraitSchema } from './racial-trait.schema';
import { RacialTraitService } from './services/racial-trait.service';

@Module({
    imports: [TypeOrmModule.forFeature([RacialTraitSchema])],
    providers: [RacialTraitService],
    exports: [RacialTraitService],
})
export class RacialTraitModule {}
