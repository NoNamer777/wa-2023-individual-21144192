import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDefined, IsEnum, IsInt, IsNotEmpty, IsPositive, IsString, IsUrl, MinLength } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { MIN_ENTITY_NAME_LENGTH } from './constants';
import { Trait } from './trait.model';

export type Size = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';

@Entity('race')
export class Race {
    @PrimaryGeneratedColumn('increment')
    @IsInt()
    @IsPositive()
    id: number;

    @Column({ nullable: false, unique: true })
    @IsNotEmpty()
    @IsString()
    @MinLength(MIN_ENTITY_NAME_LENGTH)
    name: string;

    @Column({ type: 'enum', enum: ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'], nullable: false })
    @IsEnum(['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'])
    @IsDefined()
    size: Size;

    @Column({ type: 'int', nullable: false })
    @IsInt()
    @IsPositive()
    speed: number;

    @OneToMany(() => RacialTrait, (trait) => trait.race, {
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    })
    traits: RacialTrait[];

    @Column({ nullable: false })
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    imageUrl: string;
}

export class CreateRaceData extends OmitType(Race, ['id'] as const) {}

@Entity('race-trait')
export class RacialTrait {
    @Exclude()
    @PrimaryColumn()
    raceId?: number;

    @Exclude()
    @ManyToOne(() => Race, (race) => race.traits)
    race?: Race;

    @Exclude()
    @PrimaryColumn()
    traitId?: number;

    @ManyToOne(() => Trait, (trait) => trait.races, { eager: true })
    trait: Trait;

    @Column({ type: 'mediumtext', nullable: true })
    description?: string;
}
