import { Injectable } from '@nestjs/common';
import {
    DEFAULT_PAGE_SIZE,
    DEFAULT_SORT_ORDER,
    SortableAttribute,
    SortOrder,
} from '../../common/models/pagination.model';
import { compareSize, CreateRaceData, nextId, Race, raceDb } from '../models/race.model';

@Injectable()
export class RaceService {
    private nextRaceId = nextId;

    getAll(
        page = 1,
        pageSize = DEFAULT_PAGE_SIZE,
        order = DEFAULT_SORT_ORDER,
        sortByAttribute?: SortableAttribute,
        hasTrait?: string
    ): Race[] {
        let data = this.applySorting(order, sortByAttribute);

        data = this.applyFilter(data, hasTrait);

        return this.getDataPage(data, page, pageSize);
    }

    getById(raceId: number): Race {
        if (!this.doesRaceExistById(raceId)) {
            throw Error(`Race with ID: '${raceId}' does not exist.`);
        }
        return raceDb[raceId];
    }

    update(raceData: Race): Race {
        if (!this.doesRaceExistById(raceData.id)) {
            throw Error(`Cannot update Race with ID: '${raceData.id}' because it does not exist.`);
        }
        raceDb[raceData.id] = {
            ...raceDb[raceData.id],
            ...raceData,
        };
        return null;
    }

    create(raceData: CreateRaceData): Race {
        if (this.doesRaceExistByName(raceData.name)) {
            throw Error(
                `Cannot create a new Race with name: '${raceData.name}' because a Race already exists by that name.`
            );
        }
        const newRace: Race = { id: this.nextRaceId++, ...raceData };
        raceDb[newRace.id] = newRace;

        return newRace;
    }

    deleteById(raceId: number): void {
        if (!this.doesRaceExistById(raceId)) {
            throw Error(`Can not delete Race with ID: '${raceId}' because it does not exist.`);
        }
        delete raceDb[raceId];
    }

    private doesRaceExistById(raceId: number): boolean {
        return Object.keys(raceDb).includes(`${raceId}`);
    }

    private doesRaceExistByName(raceName: string): boolean {
        return Object.values(raceDb).some((race) => race.name === raceName);
    }

    private getDataPage(data: Race[], page: number, pageSize: number): Race[] {
        const start = (page - 1) * pageSize;
        const end = page * pageSize;

        return data.slice(start, end);
    }

    private applySorting(order: SortOrder, sortByAttribute?: SortableAttribute): Race[] {
        const data = Object.values(raceDb);

        if (sortByAttribute) {
            data.sort((r1, r2) => this.applySortByAttribute(r1, r2, sortByAttribute));
        }
        return order === 'asc' ? data : data.reverse();
    }

    private applySortByAttribute(race1: Race, race2: Race, attribute: SortableAttribute): number {
        const sortByName = race1.name.localeCompare(race2.name);

        if (attribute === 'name') {
            return sortByName;
        }
        if (attribute === 'size') {
            const sortBySize = compareSize(race1.size, race2.size);
            return sortBySize === 0 ? sortByName : sortBySize;
        }
        if (attribute === 'speed') {
            const sortBySpeed = race1.speed - race2.speed;
            return sortBySpeed === 0 ? sortByName : sortBySpeed;
        }
        return 1;
    }

    private applyFilter(data: Race[], hasTrait?: string): Race[] {
        if (!hasTrait) {
            return data;
        }
        return data.filter((race) => race.traits.some((trait) => trait.name === hasTrait));
    }
}
