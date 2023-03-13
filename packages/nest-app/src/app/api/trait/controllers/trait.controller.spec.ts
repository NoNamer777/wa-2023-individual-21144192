import { Test, TestingModule } from '@nestjs/testing';
import { TraitController } from './trait.controller';
import { TraitService } from '../services/trait.service';

describe('TraitController', () => {
    let controller: TraitController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TraitController],
            providers: [{ provide: TraitService, useValue: {} }],
        }).compile();

        controller = module.get(TraitController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
