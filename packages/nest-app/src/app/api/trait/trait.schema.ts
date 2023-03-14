import { EntitySchema } from 'typeorm';
import { RacialTrait, Trait } from '@dnd-mapp/data';
import { IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger';

export class TraitRelation extends Trait {
    _racialTraits: RacialTrait[];
}

export const TraitSchema = new EntitySchema<TraitRelation>({
    name: 'Trait',
    tableName: 'trait',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: 'increment',
        },
        name: {
            type: 'varchar',
            nullable: false,
            unique: true,
        },
        description: {
            type: 'text',
            nullable: true,
        },
    },
    relations: {
        _racialTraits: {
            type: 'one-to-many',
            target: 'RacialTrait',
            inverseSide: 'trait',
        },
    },
});

export class CreateTraitData extends IntersectionType(
    PickType(Trait, ['name'] as const),
    PartialType(OmitType(Trait, ['id', 'name'] as const))
) {}
