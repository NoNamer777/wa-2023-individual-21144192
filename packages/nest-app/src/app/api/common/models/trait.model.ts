import { IsInt, IsNotEmpty, IsPositive, IsString, MinLength } from 'class-validator';
import { MIN_ENTITY_DESCRIPTION_LENGTH, MIN_ENTITY_NAME_LENGTH } from './constants';
import { IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger';

export class Trait {
    @IsInt()
    @IsPositive()
    id?: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(MIN_ENTITY_NAME_LENGTH)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(MIN_ENTITY_DESCRIPTION_LENGTH)
    description?: string;
}

export class CreateTraitData extends IntersectionType(
    PickType(Trait, ['name'] as const),
    PartialType(OmitType(Trait, ['id', 'name'] as const))
) {}

// TODO: Remove once the data has been migrated to a database

export const traitDb: { [traitId: number]: Trait } = {};

export const nextId = Object.keys(traitDb).length + 1;
