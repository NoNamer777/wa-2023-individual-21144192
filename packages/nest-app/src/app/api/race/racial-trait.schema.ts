import { Race, RacialTrait } from '@dnd-mapp/data';
import { EntitySchema } from 'typeorm';

export class RacialTraitRelation extends RacialTrait {
    raceId: number;
    traitId: number;
    race: Race;
}

export const RacialTraitSchema = new EntitySchema<RacialTraitRelation>({
    name: 'RacialTrait',
    tableName: 'race-trait',
    columns: {
        raceId: {
            type: 'int',
            primary: true,
        },
        traitId: {
            type: 'int',
            primary: true,
        },
        description: {
            type: 'text',
            nullable: true,
        },
    },
    relations: {
        race: {
            type: 'many-to-one',
            target: 'Race',
            inverseSide: 'traits',
        },
        trait: {
            type: 'many-to-one',
            target: 'Trait',
            inverseSide: 'racialTraits',
        },
    },
});
