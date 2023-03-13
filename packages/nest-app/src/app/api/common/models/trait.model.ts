import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { MIN_ENTITY_DESCRIPTION_LENGTH, MIN_ENTITY_NAME_LENGTH } from './constants';
import { IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RacialTrait } from './race.model';

@Entity('trait')
export class Trait {
    @PrimaryGeneratedColumn('increment')
    @IsInt()
    @IsPositive()
    id?: number;

    @Column({ nullable: false, unique: true })
    @IsNotEmpty()
    @IsString()
    @MinLength(MIN_ENTITY_NAME_LENGTH)
    name: string;

    @Column({ type: 'mediumtext', nullable: true })
    @IsNotEmpty()
    @IsString()
    @MinLength(MIN_ENTITY_DESCRIPTION_LENGTH)
    description?: string;

    @OneToMany(() => RacialTrait, (racialTrait) => racialTrait.trait)
    races?: RacialTrait[];
}

export class CreateTraitData extends IntersectionType(
    PickType(Trait, ['name'] as const),
    PartialType(OmitType(Trait, ['id', 'name', 'races'] as const))
) {}

// TODO: Remove once the data has been migrated to a database

export const traitDb: { [traitId: number]: Trait } = {};

export const nextTraitId = Object.keys(traitDb).length + 1;
