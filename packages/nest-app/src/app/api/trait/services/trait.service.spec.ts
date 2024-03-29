import { Trait } from '@dnd-mapp/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TraitService } from './trait.service';

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
