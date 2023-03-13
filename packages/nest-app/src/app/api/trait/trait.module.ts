import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraitController } from './controllers/trait.controller';
import { TraitService } from './services/trait.service';
import { TraitSchema } from './trait.schema';

@Module({
    imports: [TypeOrmModule.forFeature([TraitSchema])],
    controllers: [TraitController],
    providers: [TraitService],
    exports: [TraitService],
})
export class TraitModule {}
