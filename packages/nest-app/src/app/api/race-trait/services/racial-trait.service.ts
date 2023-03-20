import { RacialTrait } from '@dnd-mapp/data';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RacialTraitRelation, RacialTraitSchema } from '../racial-trait.schema';

@Injectable()
export class RacialTraitService {
    constructor(@InjectRepository(RacialTraitSchema) private racialTraitRepository: Repository<RacialTraitRelation>) {}

    async getById(raceId: number, traitId: number): Promise<RacialTrait> {
        const racialTrait = await this.racialTraitRepository.findOne({ where: { _raceId: raceId, _traitId: traitId } });

        if (racialTrait === null) {
            throw new NotFoundException(`Race with ID: '${raceId}' does not have a Trait with ID: '${traitId}'`);
        }
        return racialTrait;
    }

    async getAllByTrait(traitId: number): Promise<RacialTrait[]> {
        return await this.racialTraitRepository.find({ where: { _traitId: traitId } });
    }

    async update(racialTrait: RacialTraitRelation): Promise<RacialTrait> {
        if (!(await this.doesRacialTraitExist(racialTrait._raceId, racialTrait._traitId))) {
            throw new NotFoundException(
                `Cannot update Racial Trait because hasn't been added to Race with ID: '${racialTrait._raceId}' yet.`
            );
        }
        await this.racialTraitRepository.save(racialTrait);
        return await this.getById(racialTrait._raceId, racialTrait._traitId);
    }

    async create(racialTrait: RacialTraitRelation): Promise<RacialTrait> {
        if (await this.doesRacialTraitExist(racialTrait._raceId, racialTrait._traitId)) {
            throw new BadRequestException(
                `Cannot create a new Racial Trait because has already been added to Race with ID: '${racialTrait._raceId}'.`
            );
        }
        await this.racialTraitRepository.save(racialTrait);
        return await this.getById(racialTrait._raceId, racialTrait._traitId);
    }

    async deleteAllFromRace(raceId: number): Promise<void> {
        await this.racialTraitRepository.delete({ _raceId: raceId });
    }

    async delete(raceId: number, traitId: number): Promise<void> {
        await this.racialTraitRepository.delete({ _raceId: raceId, _traitId: traitId });
    }

    private async doesRacialTraitExist(raceId: number, traitId: number): Promise<RacialTrait> {
        try {
            return await this.getById(raceId, traitId);
        } catch (error: unknown) {
            if (error instanceof NotFoundException) {
                return null;
            }
            throw error;
        }
    }
}
