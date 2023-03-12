import { Module } from '@nestjs/common';
import { TraitService } from './services/trait.service';
import { TraitController } from './controllers/trait.controller';

@Module({
    controllers: [TraitController],
    providers: [TraitService],
})
export class TraitModule {}
