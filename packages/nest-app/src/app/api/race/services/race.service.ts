import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import {
    CreateRaceData,
    PaginationResponse,
    Race,
    RacialTrait,
    SortableAttribute,
    SortOrder,
} from '../../common/models';

@Injectable()
export class RaceService {
    constructor(
        @InjectRepository(Race) private raceRepository: Repository<Race>,
        @InjectRepository(RacialTrait) private racialTraitRepository: Repository<RacialTrait>
    ) {}

    async getAll(
        page: number,
        pageSize: number,
        order: SortOrder,
        sortByAttribute: SortableAttribute,
        hasTrait?: string
    ): Promise<PaginationResponse<Race>> {
        const data = await this.raceRepository.find({
            order: this.applySorting(order, sortByAttribute),
            where: this.applyFilter(hasTrait),
        });

        const response = new PaginationResponse(this.getPageData(data, page, pageSize));
        const totalNumberOfPages = Math.ceil(data.length / pageSize);

        response.numberOfPages = totalNumberOfPages;
        response.first = page === 1;
        response.last = page === totalNumberOfPages;
        response.pageSize = pageSize;
        response.page = page;
        response.sortOrder = order;
        response.totalResults = data.length;

        return response;
    }

    async getById(raceId: number): Promise<Race> {
        const raceById = this.raceRepository.findOne({ where: { id: raceId }, relations: { traits: true } });

        if (raceById === null) {
            throw new NotFoundException(`Race with ID: '${raceId}' does not exist.`);
        }
        return raceById;
    }

    async getByName(raceName: string): Promise<Race> {
        const raceByName = await this.raceRepository.findOne({
            where: { name: raceName },
            relations: { traits: true },
        });

        if (raceByName === null) {
            throw new NotFoundException(`Race with name: '${raceByName}' does not exist.`);
        }
        return raceByName;
    }

    async update(raceData: Race): Promise<Race> {
        if (!(await this.doesRaceExistById(raceData.id))) {
            throw new NotFoundException(`Cannot update Race with ID: '${raceData.id}' because it does not exist.`);
        }
        if (!(await this.doesRaceExistByName(raceData.name))) {
            throw new BadRequestException(
                `Cannot update a Race with ID: '${raceData.id}' because a Race already exists with the name '${raceData.name}'.`
            );
        }
        return await this.raceRepository.save(raceData);
    }

    async create(raceData: CreateRaceData): Promise<Race> {
        if (await this.doesRaceExistByName(raceData.name)) {
            throw new BadRequestException(
                `Cannot create a new Race with name: '${raceData.name}' because a Race already exists with that name.`
            );
        }
        await this.raceRepository.save(raceData);

        const savedRace = await this.getByName(raceData.name);

        for (const trait of raceData.traits) {
            trait.race = savedRace;
            trait.raceId = savedRace.id;
            trait.traitId = trait.trait.id;

            await this.racialTraitRepository.save(trait);
        }
        savedRace.traits = await this.racialTraitRepository.find({ where: { raceId: savedRace.id } });
        return await this.raceRepository.save(savedRace);
    }

    async deleteById(raceId: number): Promise<void> {
        if (!(await this.doesRaceExistById(raceId))) {
            throw new NotFoundException(`Cannot delete Race with ID: '${raceId}' because it does not exist.`);
        }
        await this.raceRepository.delete({ id: raceId });
    }

    private async doesRaceExistById(raceId: number): Promise<boolean> {
        try {
            await this.getById(raceId);
            return true;
        } catch (error: unknown) {
            if (error instanceof NotFoundException) {
                return false;
            }
            throw error;
        }
    }

    private async doesRaceExistByName(raceName: string): Promise<boolean> {
        try {
            await this.getByName(raceName);
            return true;
        } catch (error: unknown) {
            if (error instanceof NotFoundException) {
                return false;
            }
            throw error;
        }
    }

    private getPageData(data: Race[], page: number, pageSize: number): Race[] {
        const start = (page - 1) * pageSize;
        const end = page * pageSize;

        return data.slice(start, end);
    }

    private applySorting(sortOrder: SortOrder, sortByAttribute: SortableAttribute): FindOptionsOrder<Race> {
        switch (sortByAttribute) {
            case SortableAttribute.NAME:
                return { name: sortOrder };

            case SortableAttribute.SPEED:
                return { speed: sortOrder, name: sortOrder };

            case SortableAttribute.SIZE:
                return { size: sortOrder, name: sortOrder };

            default:
                return { id: sortOrder };
        }
    }

    private applyFilter(hasTrait?: string): FindOptionsWhere<Race> {
        if (!hasTrait) {
            return undefined;
        }
        return { traits: { trait: { name: hasTrait } } };
    }
}
