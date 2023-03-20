import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RacialTraitSchema } from './racial-trait.schema';

@Module({
    imports: [TypeOrmModule.forFeature([RacialTraitSchema])],
})
export class RacialTraitModule {}
