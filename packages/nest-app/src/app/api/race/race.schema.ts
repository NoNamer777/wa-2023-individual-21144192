import { Race } from '@dnd-mapp/data';
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
            enum: ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'],
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
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
    },
});
