export type Size = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';

export const sizeOrder = {
    Tiny: 1,
    Small: 2,
    Medium: 3,
    Large: 4,
    Huge: 5,
    Gargantuan: 6,
};

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
