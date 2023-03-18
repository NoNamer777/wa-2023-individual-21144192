import { ApiProperty } from '@nestjs/swagger';
import { Trait } from './trait.model';

export type Size = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';

export const SIZE_VALUES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];

export class RacialTrait {
    @ApiProperty({ name: 'trait', type: Trait, description: 'The base Trait that a Race has inherited.' })
    trait: Trait;

    @ApiProperty({
        name: 'description',
        type: String,
        nullable: true,
        description: 'A descriptive text of a Trait that is tied to a particular Race.',
    })
    description?: string;
}

export class Race {
    @ApiProperty({ name: 'id', type: Number, minimum: 1 })
    id: number;

    @ApiProperty({ name: 'name', type: String })
    name: string;

    @ApiProperty({
        name: 'size',
        enum: SIZE_VALUES,
        enumName: 'Size',
        description: 'How tall and how much space a character of this Race takes up.',
    })
    size: Size;

    @ApiProperty({
        name: 'speed',
        type: Number,
        description: 'The base walking speed in a combat round of a character of this Race.',
    })
    speed: number;

    @ApiProperty({ name: 'imageUrl', type: String })
    imageUrl: string;

    @ApiProperty({ name: 'traits', type: [RacialTrait] })
    traits: RacialTrait[];
}
