import { Module } from '@nestjs/common';
import { TraitService } from './services/trait.service';
import { TraitController } from './controllers/trait.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trait } from '../common/models';

@Module({
    imports: [TypeOrmModule.forFeature([Trait])],
    controllers: [TraitController],
    providers: [TraitService],
    exports: [TraitService],
})
export class TraitModule {}
