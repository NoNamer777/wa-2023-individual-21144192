import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraitController } from './controllers/trait.controller';
import { TraitService } from './services/trait.service';
import { Trait } from '../common/models';

@Module({
    imports: [TypeOrmModule.forFeature([Trait])],
    controllers: [TraitController],
    providers: [TraitService],
    exports: [TraitService],
})
export class TraitModule {}
