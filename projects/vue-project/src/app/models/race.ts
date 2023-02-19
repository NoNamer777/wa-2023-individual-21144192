export type Size = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';

export interface Trait {
    name: string;
    description: string;
}

export interface Race {
    name: string;
    speed: number;
    size: Size;
    imgSrc: string;
    traits: Trait[];
}
