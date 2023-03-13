import { Trait } from './trait.model';

export type Size = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';

export class Race {
    id: number;
    name: string;
    size: Size;
    speed: number;
    imageUrl: string;
    traits: RacialTrait[];
}

export class RacialTrait {
    trait: Trait;
    description?: string;
}
