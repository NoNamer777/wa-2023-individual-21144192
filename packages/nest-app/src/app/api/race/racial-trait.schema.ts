import { Race, RacialTrait } from '@dnd-mapp/data';
import { EntitySchema } from 'typeorm';

export class RacialTraitRelation extends RacialTrait {
    _raceId: number;
    _traitId: number;
    _race: Race;
}

export const RacialTraitSchema = new EntitySchema<RacialTraitRelation>({
    name: 'RacialTrait',
    tableName: 'race-trait',
    columns: {
        _raceId: {
            name: 'raceId',
            type: 'int',
            primary: true,
        },
        _traitId: {
            name: 'traitId',
            type: 'int',
            primary: true,
        },
        description: {
            type: 'text',
            nullable: true,
        },
    },
    relations: {
        _race: {
            type: 'many-to-one',
            target: 'Race',
            inverseSide: 'traits',
            joinColumn: {
                name: 'raceId',
                referencedColumnName: 'id',
                foreignKeyConstraintName: 'racialTraitRaceFK',
            },
        },
        trait: {
            type: 'many-to-one',
            target: 'Trait',
            inverseSide: '_racialTraits',
            eager: true,
            joinColumn: {
                name: 'traitId',
                referencedColumnName: 'id',
                foreignKeyConstraintName: 'racialTraitTraitFK',
            },
        },
    },
});
