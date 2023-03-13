import { Test, TestingModule } from '@nestjs/testing';
import { TraitService } from './trait.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trait } from '../../common/models';

describe('TraitService', () => {
    let service: TraitService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TraitService,
                {
                    provide: getRepositoryToken(Trait),
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get(TraitService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
