import { Race, SIZE_VALUES } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/swagger';
import { EntitySchema } from 'typeorm';

export class CreateRaceData extends OmitType(Race, ['id'] as const) {}

export const RaceSchema = new EntitySchema<Race>({
    name: 'Race',
    tableName: 'race',
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
        size: {
            type: 'enum',
            nullable: false,
            enum: SIZE_VALUES,
        },
        speed: {
            type: 'int',
            nullable: false,
        },
        imageUrl: {
            type: 'varchar',
            nullable: false,
        },
    },
    relations: {
        traits: {
            type: 'one-to-many',
            target: 'RacialTrait',
            inverseSide: '_race',
            cascade: ['insert', 'update', 'remove'],
        },
    },
});
