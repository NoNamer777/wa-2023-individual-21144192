import { Injectable } from '@nestjs/common';
import { CreateTraitData, nextTraitId, Trait, traitDb } from '../../common/models';

@Injectable()
export class TraitService {
    private nextTraitId = nextTraitId;

    getAll(): Trait[] {
        return Object.values(traitDb);
    }

    getById(traitId: number): Trait {
        if (!this.doesTraitExistById(traitId)) {
            throw Error(`Trait with ID: '${traitId}' does not exist.`);
        }
        return traitId[traitId];
    }

    update(traitData: Trait): Trait {
        if (!this.doesTraitExistById(traitData.id)) {
            throw Error(`Cannot update Trait with ID: '${traitData.id}' because it does not exist.`);
        }
        traitDb[traitData.id] = {
            ...traitDb[traitData.id],
            ...traitData,
        };
        return traitDb[traitData.id];
    }

    create(traitData: CreateTraitData): Trait {
        if (this.doesTraitExistByName(traitData.name)) {
            throw Error(
                `Cannot create a new Trait with name: '${traitData.name}' because a Trait already exists by that name.`
            );
        }
        const newTrait: Trait = { id: this.nextTraitId++, ...traitData };
        traitDb[newTrait.id] = newTrait;

        return newTrait;
    }

    deleteById(raceId: number): void {
        if (!this.doesTraitExistById(raceId)) {
            throw Error(`Can not delete Trait with ID: '${raceId}' because it does not exist.`);
        }
        delete traitDb[raceId];
    }

    private doesTraitExistById(raceId: number): boolean {
        return Object.keys(traitDb).includes(`${raceId}`);
    }

    private doesTraitExistByName(raceName: string): boolean {
        return Object.values(traitDb).some((race) => race.name === raceName);
    }
}
