import { IsDefined, IsEnum, IsInt, IsNotEmpty, IsPositive, IsString, IsUrl, MinLength } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { MIN_ENTITY_NAME_LENGTH } from './constants';
import { Trait } from './trait.model';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum Size {
    TINY = 'Tiny',
    SMALL = 'Small',
    MEDIUM = 'Medium',
    LARGE = 'Large',
    HUGE = 'Huge',
    GARGANTUAN = 'Gargantuan',
}

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

    @Column({ type: 'enum', enum: Size, nullable: false })
    @IsEnum(Size)
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

const SizeMap: Map<Size, number> = new Map([
    [Size.TINY, 1],
    [Size.SMALL, 2],
    [Size.MEDIUM, 3],
    [Size.LARGE, 4],
    [Size.HUGE, 5],
    [Size.GARGANTUAN, 6],
]);

// TODO: Remove once the data has been migrated to a database

export const raceDb: { [raceId: number]: Race } = {
    1: {
        id: 1,
        name: 'Dwarf',
        speed: 25,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/dwarf.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                },
                description: 'Your Constitution score increases by 2.',
            },
            {
                trait: {
                    name: 'Age',
                },
                description:
                    "Dwarves mature at the same rate as humans, but they're considered young until they reach the age of 50. On average, they live about 350 years.",
            },
            {
                trait: {
                    name: 'Alignment',
                },
                description:
                    'Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the benefits of a just order.',
            },
            {
                trait: {
                    name: 'Size',
                },
                description:
                    'Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium.',
            },
            {
                trait: {
                    name: 'Speed',
                },
                description: 'Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.',
            },
            {
                trait: {
                    name: 'Darkvision',
                },
                description:
                    "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
            },
            {
                trait: {
                    name: 'Dwarven Resilience',
                    description:
                        'You have advantage on saving throws against poison, and you have resistance against poison damage (explained in chapter 9).',
                },
            },
            {
                trait: {
                    name: 'Dwarven Combat Training',
                    description: 'You have proficiency with the battleaxe, handaxe. light hammer, and warhammer.',
                },
            },
            {
                trait: {
                    name: 'Tool Proficiency',
                    description:
                        "You gain proficiency with the artisan's tools of your choice: smith's tools, brewer's supplies, or mason's tools.",
                },
            },
            {
                trait: {
                    name: 'Stonecunning',
                    description:
                        'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                },
                description:
                    'You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.',
            },
            {
                trait: {
                    name: 'Subrace',
                },
                description:
                    'Two main subraces of dwarves populate the worlds of D&D: hill dwarves and mountain dwarves. Choose one of these subraces.',
            },
        ],
    },
    2: {
        id: 2,
        name: 'Elf',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/elf.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                },
                description: 'Your Dexterity score increases by 2.',
            },
            {
                trait: {
                    name: 'Age',
                },
                description:
                    'Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old.',
            },
            {
                trait: {
                    name: 'Alignment',
                },
                description:
                    "Elves love freedom, variety, and selfexpression, so they lean strongly toward the gentler aspects of chaos. They value and protect others' freedom as well as their own, and they are more often good than not. The drow are an exception; their exile into the Underdark has made them vicious and dangerous. Drow are more often evil than not.",
            },
            {
                trait: {
                    name: 'Size',
                },
                description:
                    'Elves range from under 5 to aver 6 feet tall and have slender builds. Your size is Medium.',
            },
            {
                trait: {
                    name: 'Speed',
                },
                description: 'Your base walking speed is 30 feet.',
            },
            {
                trait: {
                    name: 'Darkvision',
                },
                description:
                    "Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
            },
            {
                trait: {
                    name: 'Keen Senses',
                    description: 'You have proficiency in the Perception skill.',
                },
            },
            {
                trait: {
                    name: 'Fey Ancestry',
                    description:
                        "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
                },
            },
            {
                trait: {
                    name: 'Trance',
                    description:
                        'Elves don\'t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is "trance.") While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                },
                description:
                    'You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.',
            },
            {
                trait: {
                    name: 'Subrace',
                },
                description:
                    'Ancient divides among the elven people resulted in three main subraces: high elves, wood elves, and dark elves, who are commonly called draw. Choose one of these subraces. In some worlds, these subraces are divided still further (such as the sun elves and moon elves of the Forgotten Realms), so if you wish, you can choose a narrower subrace.',
            },
        ],
    },
    3: {
        id: 3,
        name: 'Halfling',
        speed: 25,
        size: Size.SMALL,
        imageUrl: 'http://localhost:8080/assets/images/races/halfling.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                },
                description: 'Your Dexterity score increases by 2.',
            },
            {
                trait: {
                    name: 'Age',
                },
                description:
                    'A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second century.',
            },
            {
                trait: {
                    name: 'Alignment',
                },
                description:
                    'Most halflings are lawful good. As a rule, they are goad-hearted and kind, hate to see others in pain, and have no tolerance for oppression. They are also very orderly and traditional, leaning heavily on the support of their community and the comfort of their old ways.',
            },
            {
                trait: {
                    name: 'Size',
                },
                description: 'Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small.',
            },
            {
                trait: {
                    name: 'Speed',
                },
                description: 'Your base walking speed is 25 feet.',
            },
            {
                trait: {
                    name: 'Lucky',
                    description:
                        'When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.',
                },
            },
            {
                trait: {
                    name: 'Brave',
                    description: 'You have advantage on saving throws against being frightened.',
                },
            },
            {
                trait: {
                    name: 'Halfling Nimbleness',
                    description: 'You can move through the space of any creature that is of a size larger than yours.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                },
                description:
                    "You can speak, read, and write Common and Halfling. The Halfling language isn't secret, but halflings are loath to share it with others. They write very little, so they don't have a rich body of literature. Their oral tradition, however, is very strong. Almost all halflings speak Common to converse with the people in whose lands they dwell or through which they are traveling.",
            },
            {
                trait: {
                    name: 'Subrace',
                },
                description:
                    'The two main kinds of halfling, lightfoot and stout, are more like closely related families than true subraces. Choose one of these subraces.',
            },
        ],
    },
    4: {
        id: 4,
        name: 'Human',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/human.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                },
                description: 'Your ability scores each increase by 1.',
            },
            {
                trait: {
                    name: 'Age',
                },
                description: 'Humans reach adulthood in their late teens and live less than a century.',
            },
            {
                trait: {
                    name: 'Alignment',
                },
                description: 'Humans tend toward no particular alignment. The best and the worst are found among them.',
            },
            {
                trait: {
                    name: 'Size',
                },
                description:
                    'Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium.',
            },
            {
                trait: {
                    name: 'Speed',
                },
                description: 'Your base walking speed is 30 feet.',
            },
            {
                trait: {
                    name: 'Languages',
                },
                description:
                    'You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.',
            },
        ],
    },
    5: {
        id: 5,
        name: 'Dragonborn',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/dragonborn.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                },
                description: 'Your Strength score increases by 2, and your Charisma score increases by 1.',
            },
            {
                trait: {
                    name: 'Age',
                },
                description:
                    'Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.',
            },
            {
                trait: {
                    name: 'Alignment',
                },
                description:
                    'Dragonborn tend to extremes, making a conscious choice for one side or the other in the cosmic war between good and evil (represented by Bahamut and Tiamat, respectively). Most dragonborn are good, but those who side with Tiamat can be terrible villains.',
            },
            {
                trait: {
                    name: 'Size',
                },
                description:
                    'Dragonborn are taller and heavier than humans, standing well over 6 feet tall and averaging almost 250 pounds. Your size is Medium.',
            },
            {
                trait: {
                    name: 'Speed',
                },
                description: 'Your base walking speed is 30 feet.',
            },
            {
                trait: {
                    name: 'Draconic Ancestry',
                    description:
                        'You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type, as shown in the table.',
                },
            },
            {
                trait: {
                    name: 'Breath Weapon',
                    description:
                        "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation.\n\tWhen you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.\n\tAfter you use your breath weapon, you can't use it again until you complete a short or long rest.",
                },
            },
            {
                trait: {
                    name: 'Damage Resistance',
                    description: 'You have resistance to the damage type associated with your draconic ancestry.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                },
                description:
                    'You can speak, read, and write Common and Draconic. Draconic is thought to be one of the oldest languages and is often used in the study of magic. The language sounds harsh to most other creatures and includes numerous hard consonants and sibilants.',
            },
        ],
    },
    6: {
        id: 6,
        name: 'Gnome',
        speed: 25,
        size: Size.SMALL,
        imageUrl: 'http://localhost:8080/assets/images/races/gnome.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Intelligence score increases by 2.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Gnomes mature at the same rate humans do, and most are expected to settle down into an adult life by around age 40. They can live 350 to almost 500 years.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Gnomes are most often good. Those who tend toward law are sages, engineers, researchers, scholars, investigators, or inventors. Those who tend toward chaos are minstrels, tricksters, wanderers, or fanciful jewelers, Gnomes are good-hearted, and even the tricksters among them are more playful than vicious.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Gnomes are between 3 and 4 feet tall and average about 40 pounds. Your size is Small.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 25 feet.',
                },
            },
            {
                trait: {
                    name: 'Darkvision',
                    description:
                        "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
                },
            },
            {
                trait: {
                    name: 'Gnome Cunning',
                    description:
                        'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description:
                        'You can speak, read, and write Common and Gnomish. The Gnomish language, which uses the Dwarvish script, is renowned for its technical treatises and its catalogs of knowledge about the natural world.',
                },
            },
            {
                trait: {
                    name: 'Subrace',
                    description:
                        'Two subraces of gnomes are found among the worlds of D&D: forest gnomes and rock gnomes. Choose one of these subraces.',
                },
            },
        ],
    },
    7: {
        id: 7,
        name: 'Half-Elf',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/half-elf.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description:
                        'Your Charisma score increases by 2, and two other ability scores of your choice increase by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much longer than humans, however, often exceeding 180 years.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        "Half-elves share the chaotic bent of their elven heritage. They value both personal freedom and creative expression, demonstrating neither love of leaders nor desire for followers. They chafe at rules. resent others' demands, and sometimes prove unreliable, or at least unpredictable.",
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Half-elves are about the same size as humans, ranging from 5 to 6 feet tall. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Darkvision',
                    description:
                        "Thanks to your elf blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
                },
            },
            {
                trait: {
                    name: 'Fey Ancestry',
                    description:
                        "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
                },
            },
            {
                trait: {
                    name: 'Skill Versatility',
                    description: 'You gain proficiency in two skills of your choice.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description:
                        'You can speak, read, and write Common, Elvish, and one extra language of your choice.',
                },
            },
        ],
    },
    8: {
        id: 8,
        name: 'Half-Orc',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/half-orc.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Strength score increases by 2, and your Constitution score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Half-ores mature a little faster than humans. reaching adulthood around age 14. They age noticeably faster and rarely live longer than 75 years.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Half-ores inherit a tendency toward chaos from their orc parents and are not strongly inclined toward good. Half-ores raised among ores and willing to live out their lives among them are usually evil.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Half-ores are somewhat larger and bulkier than humans, and they range From 5 to well over 6 feet tall. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Darkvision',
                    description:
                        "Thanks to your ore blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
                },
            },
            {
                trait: {
                    name: 'Menacing',
                    description: 'You gain proficiency in the Intimidation skill.',
                },
            },
            {
                trait: {
                    name: 'Relentless Endurance',
                    description:
                        "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest.",
                },
            },
            {
                trait: {
                    name: 'Savage Attacks',
                    description:
                        "When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit.",
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description:
                        'You can speak, read, and write Common and Orc. Ore is a harsh, grating language with hard consonants. It has no script of its own but is written in the Dwarvish script.',
                },
            },
        ],
    },
    9: {
        id: 9,
        name: 'Tiefling',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/tiefling.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Intelligence score increases by 1, and your Charisma score increases by 2.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description: 'Tieflings mature at the same rate as humans but live a few years longer.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Tieflings might not have an innate tendency toward evil, but many of them end up there. Evil or not. an independent nature inclines many tieflings toward a chaotic alignment.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description: 'Tieflings are about the same size and build as humans. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Darkvision',
                    description:
                        "Thanks to your infernal heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
                },
            },
            {
                trait: {
                    name: 'Hellish Resistance',
                    description: 'You have resistance to fire damage.',
                },
            },
            {
                trait: {
                    name: 'Infernal Legacy',
                    description:
                        'You know the thaumaturgy cantrip. Once you reach 3rd level, you can cast the hellish rebuke spell once per day as a 2nd-level spell. Once you reach 5th level, you can also cast the darkness spell once per long rest. Charisma is your spellcasting ability for these spells.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and Infernal.',
                },
            },
        ],
    },
    10: {
        id: 10,
        name: 'Aasimar',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/aasimar.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Charisma score increases by 2.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description: 'Aasimar mature at the same rate as humans, but they can live up to 160 years.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Imbued with celestial power, most aasimar are good. Outcast aasimar are most often neutral or even evil.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description: 'Aasimar have the same range of height and weight as humans.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Darkvision',
                    description:
                        "Blessed with a radiant soul, your vision can easily cut through darkness. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
                },
            },
            {
                trait: {
                    name: 'Celestial Resistance',
                    description: 'You have resistance to necrotic damage and radiant damage.',
                },
            },
            {
                trait: {
                    name: 'Healing Hands',
                    description:
                        "As an action, you can touch a creature and cause it to regain a number of hit points equal to your level. Once you use this trait, you can't use it again until you finish a long rest.",
                },
            },
            {
                trait: {
                    name: 'Light Bearer',
                    description: 'You know the light cantrip. Charisma is your spellcasting ability for it.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and Celestial.',
                },
            },
            {
                trait: {
                    name: 'Subrace',
                    description:
                        'Three subraces of aasimar exist: protector aasimar, scourge aasimar, and fallen aasimar. Choose one of them for your character.',
                },
            },
        ],
    },
    11: {
        id: 11,
        name: 'Firbolg',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/firbolg.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Wisdom score increases by 2, and your Strength score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'As humanoids related to the fey, firbolg have long lifespans. A firbolg reaches adulthood around 30, and the oldest of them can live for 500 years.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'As people who follow the rhythm of nature and see themselves as its caretakers, firbolg are typically neutral good. Evil firbolg are rare and are usually the sworn enemies of the rest of their kind.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Firbolg are between 7 and 8 feet tall and weigh between 240 and 300 pounds. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Firbolg Magic',
                    description:
                        "You can cast detect magic and disguise self with this trait, using Wisdom as your spellcasting ability for them. Once you cast either spell, you can't cast it again with this trait until you finish a short or long rest. When you use this version of disguise self, you can seem up to 3 feet shorter than normal, allowing you to more easily blend in with humans and elves.",
                },
            },
            {
                trait: {
                    name: 'Hidden Step',
                    description:
                        "As a bonus action, you can magically turn invisible until the start of your next turn or until you attack, make a damage roll, or force someone to make a saving throw. Once you use this trait, you can't use it again until you finish a short or long rest.",
                },
            },
            {
                trait: {
                    name: 'Powerful Build',
                    description:
                        'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
                },
            },
            {
                trait: {
                    name: 'Speech of Beast and Leaf',
                    description:
                        'You have the ability to communicate in a limited manner with beasts and plants. They can understand the meaning of your words, though you have no special ability to understand them in return. You have advantage on all Charisma checks you make to influence them.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common, Elvish, and Giant.',
                },
            },
        ],
    },
    12: {
        id: 12,
        name: 'Goliath',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/goliath.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Strength score increases by 2, and your Constitution score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Goliaths have lifespans comparable to humans. They enter adulthood in their late teens and usually live less than a century.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Goliath society, with its clear roles and tasks, has a strong lawful bent. The goliath sense of fairness, balanced with an emphasis on self-sufficiency and personal accountability, pushes them toward neutrality.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Goliaths are between 7 and 8 feet tall and weigh between 280 and 340 pounds. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Natural Athlete',
                    description: 'You have proficiency in the Athletics skill.',
                },
            },
            {
                trait: {
                    name: "Stone's Endurance",
                    description:
                        "You can focus yourself to occasionally shrug off injury. When you take damage, you can use your reaction to roll a dl2. Add your Constitution modifier to the number rolled, and reduce the damage by that total. After you use this trait, you can't use it again until you finish a short or long rest.",
                },
            },
            {
                trait: {
                    name: 'Powerful Build',
                    description:
                        'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
                },
            },
            {
                trait: {
                    name: 'Mountain Born',
                    description:
                        "You're acclimated to high altitude, including elevations above 20,000 feet. You're also naturally adapted to cold climates, as described in chapter 5 of the Dungeon Master's Guide.",
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and Giant.',
                },
            },
        ],
    },
    13: {
        id: 13,
        name: 'Kenku',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/kenku.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Dexterity score increases by 2, and your Wisdom score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Kenku have shorter lifespans than humans. They reach maturity at about 12 years old and can live to 60.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Kenku are chaotic creatures, rarely making enduring commitments, and they care mostly for preserving their own hides. They are generally chaotic neutral in outlook.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Kenku are around 5 feet tall and weigh between 90 and 120 pounds. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Expert Forgery',
                    description:
                        "You can duplicate other creatures' handwriting and craftwork. You have advantage on all checks made to produce forgeries or duplicates of existing objects.",
                },
            },
            {
                trait: {
                    name: 'Kenku Training',
                    description:
                        'You are proficient in your choice of two of the following skills: Acrobatics, Deception, Stealth, and Sleight of Hand.',
                },
            },
            {
                trait: {
                    name: 'Mimicry',
                    description:
                        'You can mimic sounds you have heard, including voices. A creature that hears the sounds you make can tell they are imitations with a successful Wisdom (Insight) check opposed by your Charisma (Deception) check.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description:
                        'You can read and write Common and Auran, but you can speak only by using your Mimicry trait.',
                },
            },
        ],
    },
    14: {
        id: 14,
        name: 'Lizardfolk',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/lizardfolk.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Constitution score increases by 2, and your Wisdom score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description: 'Lizardfolk reach maturity around age 14 and rarely live longer than 60 years.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Most lizardfolk are neutral. They see the world as a place of predators and prey, where life and death are natural processes. They wish only to survive, and prefer to leave other creatures to their own devices.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Lizardfolk are a little bulkier and taller than humans, and their colorful frills make them appear even larger. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet, and you have a swimming speed of 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Bite',
                    description:
                        'Your fanged maw is a natural weapon, which you can use to make unarmed strikes. If you hit with it, you deal piercing damage equal to ld6 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.',
                },
            },
            {
                trait: {
                    name: 'Cunning Artisan',
                    description:
                        "As part of a short rest, you can harvest bone and hide from a slain beast, construct, dragon, monstrosity, or plant creature of size Small or larger to create one of the following items: a shield, a club, a javelin, or ld4 darts or blowgun needles. To use this trait, you need a blade, such as a dagger, or appropriate artisan's tools, such as leatherworker's tools.",
                },
            },
            {
                trait: {
                    name: 'Hold Breath',
                    description: 'You can hold your breath for up to 15 minutes at a time.',
                },
            },
            {
                trait: {
                    name: "Hunter's Lore",
                    description:
                        'You gain proficiency with two of the following skills of your choice: Animal Handling, Nature, Perception, Stealth, and Survival.',
                },
            },
            {
                trait: {
                    name: 'Natural Armor',
                    description:
                        "You have tough, scaly skin. When you aren't wearing armor, your AC is 13 + your Dexterity modifier. You can use your natural armor to determine your AC if the armor you wear would leave you with a lower AC. A shield's benefits apply as normal while you use your natural armor.",
                },
            },
            {
                trait: {
                    name: 'Hungry Jaws',
                    description:
                        "In battle, you can throw yourself into a vicious feeding frenzy. As a bonus action, you can make a special attack with your bite. If the attack hits, it deals its normal damage, and you gain temporary hit points (minimum of 1) equal to your Constitution modifier, and you can't use this trait again until you finish a short or long rest.",
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and Draconic.',
                },
            },
        ],
    },
    15: {
        id: 15,
        name: 'Tabaxi',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/tabaxi.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Dexterity score increases by 2, and your Charisma score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description: 'Tabaxi have lifespans equivalent to humans.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Tabaxi tend toward chaotic alignments, as they let impulse and fancy guide their decisions. They are rarely evil, with most of them driven by curiosity rather than greed or other dark impulses.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Tabaxi are taller on average than humans and relatively slender. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Darkvision',
                    description:
                        "You have a cat's keen senses, especially in the dark. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
                },
            },
            {
                trait: {
                    name: 'Feline Agility',
                    description:
                        "Your reflexes and agility allow you to move with a burst of speed. When you move on your turn in combat, you can double your speed until the end of the turn. Once you use this trait, you can't use it again until you move O feet on one of your turns.",
                },
            },
            {
                trait: {
                    name: "Cat's Claws",
                    description:
                        'Because of your claws, you have a climbing speed of 20 feet. In addition, your claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal slashing damage equal to ld4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.',
                },
            },
            {
                trait: {
                    name: "Cat's Talent",
                    description: 'You have proficiency in the Perception and Stealth skills.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and one other language of your choice.',
                },
            },
        ],
    },
    16: {
        id: 16,
        name: 'Triton',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/triton.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Strength, Constitution, and Charisma scores each increase by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description: 'Tritons reach maturity around age 15 and can live up to 200 years.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Tritons tend toward lawful good. As guardians of the darkest reaches of the sea, their culture pushes them toward order and benevolence.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Tritons are slightly shorter than humans, averaging about 5 feet tall. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet, and you have a swimming speed of 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Amphibious',
                    description: 'You can breathe air and water.',
                },
            },
            {
                trait: {
                    name: 'Control Air and Water',
                    description:
                        "A child of the sea, you can call on the magic of elemental air and water. You can cast fog cloud with this trait. Starting at 3rd level, you can cast gust of wind with it, and starting at 5th level, you can also cast wall of water with it (see the spell in the sidebar). Once you cast a spell with this trait, you can't do so again until you finish a long rest. Charisma is your spellcasting ability for these spells.",
                },
            },
            {
                trait: {
                    name: 'Emissary of the Sea',
                    description:
                        'Aquatic beasts have an extraordinary affinity with your people. You can communicate simple ideas with beasts that can breathe water. They can understand the meaning of your words, though you have no special ability to understand them in return.',
                },
            },
            {
                trait: {
                    name: 'Guardians of the Depths',
                    description:
                        'Adapted to even the most extreme ocean depths, you have resistance to cold damage, and you ignore any of the drawbacks caused by a deep, underwater environment.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and Primordial.',
                },
            },
        ],
    },
    17: {
        id: 17,
        name: 'Bugbear',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/bugbear.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Strength score increases by 2, and your Dexterity score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description: 'Bugbears reach adulthood at age 16 and live up to 80 years.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Bugbears endure a harsh existence that demands each of them to remain self-sufficient, even at the expense of their fellows. They tend to be chaotic evil.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Bugbears are between 6 and 8 feet tall and weigh between 250 and 350 pounds. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Darkvision',
                    description:
                        "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
                },
            },
            {
                trait: {
                    name: 'Long-Limbed',
                    description:
                        'When you make a melee attack on your turn, your reach for it is 5 feet greater than normal.',
                },
            },
            {
                trait: {
                    name: 'Powerful Build',
                    description:
                        'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
                },
            },
            {
                trait: {
                    name: 'Sneaky',
                    description: 'You are proficient in the Stealth skill.',
                },
            },
            {
                trait: {
                    name: 'Surprise Attack',
                    description:
                        'If you surprise a creature and hit it with an attack on your first turn in combat, the attack deals an extra 2d6 damage to it. You can use this trait only once per combat.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and Goblin.',
                },
            },
        ],
    },
    18: {
        id: 18,
        name: 'Goblin',
        speed: 30,
        size: Size.SMALL,
        imageUrl: 'http://localhost:8080/assets/images/races/goblin.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Dexterity score increases by 2, and your Constitution score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description: 'Goblins reach adulthood at age 8 and live up to 60 years.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Goblins are typically neutral evil, as they care only for their own needs. A few goblins might tend toward good or neutrality, but only rarely.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Goblins are between 3 and 4 feet tall and weigh between 40 and 80 pounds. Your size is Small.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Darkvision',
                    description:
                        "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
                },
            },
            {
                trait: {
                    name: 'Fury of the Small',
                    description:
                        "When you damage a creature with an attack or a spell and the creature's size is larger than yours, you can cause the attack or spell to deal extra damage to the creature. The extra damage equals your level. Once you use this trait, you can't use it again until you finish a short or long rest.",
                },
            },
            {
                trait: {
                    name: 'Nimble Escape',
                    description: 'You can take the Disengage or Hide action as a bonus action on each of your turns.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and Goblin.',
                },
            },
        ],
    },
    19: {
        id: 19,
        name: 'Hobgoblin',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/hobgoblin.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Constitution score increases by 2, and your Intelligence score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Hobgoblins mature at the same rate as humans and have lifespans similar in length to theirs.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Hobgoblin society is built on fidelity to a rigid, unforgiving code of conduct. As such, they tend toward lawful evil.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Hobgoblins are between 5 and 6 feet tall and weigh between 150 and 200 pounds. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Darkvision',
                    description:
                        "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
                },
            },
            {
                trait: {
                    name: 'Martial Training',
                    description: 'You are proficient with two martial weapons of your choice and with light armor.',
                },
            },
            {
                trait: {
                    name: 'Saving Face',
                    description:
                        "Hobgoblins are careful not to show weakness in front of their allies, for fear of losing status. If you miss with an attack roll or fail an ability check or a saving throw, you can gain a bonus to the roll equal to the number of allies you can see within 30 feet of you (maximum bonus of +5). Once you use this trait, you can't use it again until you finish a short or long rest.",
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and Goblin.',
                },
            },
        ],
    },
    20: {
        id: 20,
        name: 'Kobold',
        speed: 30,
        size: Size.SMALL,
        imageUrl: 'http://localhost:8080/assets/images/races/kobold.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Dexterity score increases by 2, and your Strength score is reduced by 2.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description: 'Kobolds reach adulthood at age 6 and can live up to 120 years but rarely do so.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Kobolds are fundamentally selfish, making them evil, but their reliance on the strength of their group makes them trend toward law.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Kobolds are between 2 and 3 feet tall and weigh between 25 and 35 pounds. Your size is Small.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Darkvision',
                    description:
                        "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
                },
            },
            {
                trait: {
                    name: 'Grovel, Cover and Beg',
                    description:
                        "As an action on your tum, you can cower pathetically to distract nearby foes. Until the end of your next turn, your allies gain advantage on attack rolls against enemies within 10 feet of you that can see you. Once you use this trait, you can't use it again until you finish a short or long rest.",
                },
            },
            {
                trait: {
                    name: 'Pack Tactics',
                    description:
                        "You have advantage on an attack roll against a creature if at least one of your allies is within 5 feet of the creature and the ally isn't incapacitated.",
                },
            },
            {
                trait: {
                    name: 'Sunlight Sensitivity',
                    description:
                        'You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and Draconic.',
                },
            },
        ],
    },
    21: {
        id: 21,
        name: 'Orc',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/orc.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description:
                        'Your Strength score increases by 2, your Constitution score increases by 1, and your Intelligence score is reduced by 2.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description: 'Ores reach adulthood at age 12 and live up to 50 years.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Ores are vicious raiders, who believe that the world should be theirs. They also respect strength above all else and believe the strong must bully the weak to ensure that weakness does not spread like a disease. They are usually chaotic evil.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Ores are usually over 6 feet tall and weigh between 230 and 280 pounds. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Darkvision',
                    description:
                        "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
                },
            },
            {
                trait: {
                    name: 'Aggressive',
                    description:
                        'As a bonus action, you can move up to your speed toward an enemy of your choice that you can see or hear. You must end this move closer to the enemy than you started.',
                },
            },
            {
                trait: {
                    name: 'Menacing',
                    description: 'You are trained in the Intimidation skill.',
                },
            },
            {
                trait: {
                    name: 'Powerful Build',
                    description:
                        'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and Orc.',
                },
            },
        ],
    },
    22: {
        id: 22,
        name: 'Yuan-ti Pureblood',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/yuan-ti-pureblood.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Charisma score increases by 2, and your Intelligence score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Purebloods mature at the same rate as humans and have lifespans similar in length to theirs.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Purebloods are devoid of emotion and see others as tools to manipulate. They care little for law or chaos and are typically neutral evil.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description: 'Purebloods match humans in average size and weight. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Darkvision',
                    description:
                        "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
                },
            },
            {
                trait: {
                    name: 'Innate Spellcasting',
                    description:
                        "You know the poison spray cantrip. You can cast animal friendship an unlimited number of times with this trait, but you can target only snakes with it. Starting at 3rd level, you can also cast suggestion with this trait. Once you cast it, you can't do so again until you finish a long rest. Charisma is your spellcasting ability for these spells.",
                },
            },
            {
                trait: {
                    name: 'Magic Resistance',
                    description: 'You have advantage on saving throws against spells and other magical effects.',
                },
            },
            {
                trait: {
                    name: 'Poison Immunity',
                    description: 'You are immune to poison damage and the poisoned condition.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common, Abyssal, and Draconic.',
                },
            },
        ],
    },
    23: {
        id: 23,
        name: 'Tortle',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/tortle.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Strength score increases by 2, and your Wisdom score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Young tortles crawl for a few weeks after birth before learning to walk on two legs. They reach adulthood by the afe of 15 and live an average of 50 years.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        "Tortles tend to lead orderly, ritualistic lives. They develop customs and routines, becoming more set in their ways as they age. Most are lawful good. A few can be selfish and greedy, tending more toward evil, but it's unusual for a tortle to shuck off order in favor of chaos.",
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Tortle adults stand 5 to 60 feet tall and average 450 pounds. Their shells account for roughly one-third of their weight. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Claws',
                    description:
                        'Your claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal slashing damage equal to 1d4 + your Strength modifier, instead of bludgeoning damage normal for an unarmed strike.',
                },
            },
            {
                trait: {
                    name: 'Hold Breath',
                    description:
                        "You can hold your breath for up to 1 hour at a time. Tortles aren't natural swimmers, but they can remain underwater for some time before needing to come up for air.",
                },
            },
            {
                trait: {
                    name: 'Natural Armor',
                    description:
                        "Due to your shell and the shape of your body, you are ill-suited to wearing armor. Your shell provides ample protection, however; it gives you a base AC of 17 (your Dexterity modifier doesn't affect this number). You gain no benefit from wearing armor, but if you are using a shield, you can apply the shield's bonus as normal.",
                },
            },
            {
                trait: {
                    name: 'Shell Defense',
                    description:
                        "You can withdraw into your shell as an action. Until you emerge, you gain a +4 bonus to AC, and you have advantage on Strength and Constitution saving throws. While in your shell, you are prone, your speed is 0 and can't increase, you have disadvantage on Dexterity saving throws, you can't take reactions, and the only action you can take is a bonus action to emerge from your shell.",
                },
            },
            {
                trait: {
                    name: 'Survival Instinct',
                    description:
                        'You gain proficiency in the Survival skill. Tortles have finely honed survival instincts.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Aquan and Common.',
                },
            },
        ],
    },
    24: {
        id: 24,
        name: 'Changeling',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/changeling.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description:
                        'Your Charisma score increases by 2, and either your Dexterity or your Intelligence increases by 1 (your choice).',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Changelings mature slightly faster than humans but share a similar lifespan—typically a century or less. While a changeling can shapeshift to conceal their age, the effects of again still catch up to them.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Changelings hate to be bound in any way, and those who follow the path of the Traveler believe that chaos and change are important aspects of life. Most tend toward pragmatic neutrality as opposed to being concerned with lofty ideals. Despite common fears, few changelings embrace evil.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'In their natural forms, changelings average between 5 to 6 feet in height, with a slender build. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Change Appearance',
                    description:
                        "As an action, you can transform your appearance or revert to your natural form. You can’t duplicate the appearance of a creature you’ve never seen, and you revert to your natural form if you die.\n\tYou decide what you look like, including your height, weight, facial features, the sound of your voice, coloration, hair length, sex, and any other distinguishing characteristics. You can make yourself appear as a member of another race, though none of your game statistics change. You also can't appear as a creature of a differnt size than you, and your basic shape stays the same; if you’re bipedal, you can’t use this trait to become quadrupedal, for instance. Your clothing and other equipment don’t change in appearance, size, or shape to match your new form, requiring you to keep a few extra outfits on hand to make the most compelling disguise possible.\n\tEven to the most astute observers, your ruse is usually indiscernible. If you rouse suspicion, or if a wary creature suspects something is amiss, you nhave advantage on any Charisma (Deception) check you make to avoid detection.",
                },
            },
            {
                trait: {
                    name: 'Changeling Instincts',
                    description:
                        'You gain proficiency with two of the following skills of your choice: Deception, Intimidation, Insight, and Persuasion.',
                },
            },
            {
                trait: {
                    name: 'Unsettling Visage',
                    description:
                        'When a creature you can see makes an attack roll against you, you can use your reaction to impose disadvantage on the roll. You must use this feature before knowing whether the attack hits or misses.\n\tUsing this trait reveals your shapeshifting nature to any creature within 30 feet that can see you. Once you use this trait, you can’t use it again until you finish a short or long rest.',
                },
            },
            {
                trait: {
                    name: 'Divergent Persona',
                    description:
                        'You gain proficiency with one tool of your choice. Define a unique identity associated with that proficiency; establish the name, race, gender, age, and other details. While you are in the form of this persona, the related proficiency bonus is doubled for any ability check you make that uses that proficiency.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and two other languages of your choice.',
                },
            },
        ],
    },
    25: {
        id: 25,
        name: 'Kalashtar',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/kalashtar.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description:
                        'Your Wisdom and Charisma scores both increase by 1. In addition, one ability score of your choice increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Kalashtar develop physically at the same rate as humans do and have similar lifespans.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'The noble spirit tied to a kalashtar drives it toward lawful and good behavior. Most kalashtar combine strong selfdiscipline with compassion for all sentient beings, but some kalashtar resist the virtuous influence of their spirit.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Kalashtar are similar in build to humans, though they are typically a few inches taller. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Dual Mind',
                    description:
                        "When you make a Wisdom saving throw, you can use your reaction to gain advantage on the roll. You can use this trait immediately before or after you roll, but before any of the roll's effects occur.",
                },
            },
            {
                trait: {
                    name: 'Mental Discipline',
                    description: 'You have resistance to psychic damage.',
                },
            },
            {
                trait: {
                    name: 'Mind Link',
                    description:
                        'You can speak telepathically to any creature you can see within 60 feet of you. You don’t need to share a language with the creature for it to understand your telepathic messages, but the creature must be able to understand at least one language or be telepathic itself.\n\tAs a bonus action when you’re speaking telepathically to a creature, you can give that creature the ability to speak telepathically to you until the start of your next turn. To use this ability, the creature must be within 60 feet of you and be able to see you.',
                },
            },
            {
                trait: {
                    name: 'Psychic Glamour',
                    description:
                        'Choose one of the following skills: Insight, Intimidation, Performance, or Persuasion. You have advantage on all ability checks you make with that skill.',
                },
            },
            {
                trait: {
                    name: 'Severed from Dreams',
                    description:
                        'Kalashtar sleep, but they don’t connect to the plane of dreams as other creatures do. Instead, their minds draw from the memories of their otherworldly spirit while they sleep. As such, you are immune to magical spells and effects that require you to dream, like the dream, but not to spells and effects that put you to sleep, like the sleep spell.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common, Quori, and one other language of your choice.',
                },
            },
        ],
    },
    26: {
        id: 26,
        name: 'Shifter',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/shifter.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Dexterity score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Shifters are quick to mature both physically and emotionally, reaching young adulthood at age 10. They rarely live to be more than 70 years old.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Shifters tend toward neutrality, being more focused on survival than concepts of good and evil. A love of personal freedom can drive shifters toward chaotic alignments.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Shifters range from 5 to almost 7 feet tall, depending on their subrace. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Darkvision',
                    description:
                        'You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.',
                },
            },
            {
                trait: {
                    name: 'Keen Senses',
                    description: 'You have proficiency with the Perception skill.',
                },
            },
            {
                trait: {
                    name: 'Shifting',
                    description:
                        'As a bonus action, you can assume a more bestial appearance. This transformation lasts for 1 minute, until you die, or until you revert to your normal appearance as a bonus action. When you shift, you gain temporary hit points equal to your level + your Constitution modifier (minimum of 1 temporary hit point). You also gain additional benefits that depend on your shifter subrace, described below.\n\tOnce you shift, you can’t do so again until you finish a short or long rest.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common.',
                },
            },
            {
                trait: {
                    name: 'Subrace',
                    description:
                        'The beast within shapes each shifter physically and mentally. Four major subraces of shifter are found among the worlds of D&D: Beasthide, Longtooth, Swiftstride, and Wildhunt. Choose one of these subraces.',
                },
            },
        ],
    },
    27: {
        id: 27,
        name: 'Warforged',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/warforged.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Constitution score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'A typical warforged is between two and thirty years old. The maximum lifespan of the warforged remains a mystery; so far, warforged have shown no signs of deterioration due to age.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Most warforged take comfort in order and discipline, tending toward law and neutrality. But some have absorbed the morality — or lack thereof — of the beings with which they served.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Your size is Medium. Most warforged stand between 5 and 6 1/2 feet tall. Weight and build are affected by subrace.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Warforfed Resilience',
                    description:
                        "You were created to have remarkable fortitude, represented by the following benefits. <ul><li>You have advantage on saving throws against being poisoned, and you have resistance to poison damage.</li><li>You are immune to disease.</li><li>You don't need to eat, drink, or breathe.</li><li>You don't need to sleep and don't suffer the effects of exhaustion due to lack of rest, and magic can't put you to sleep.</li></ul>",
                },
            },
            {
                trait: {
                    name: "Sentry's Rest",
                    description:
                        "When you take a long rest, you must spend at least six hours in an inactive, motionless state, rather than sleeping. In this state, you appear inert, but it doesn't render you unconscious, and you can see and hear as normal.",
                },
            },
            {
                trait: {
                    name: 'Integrated Protection',
                    description:
                        'Your body has builtin defensive layers, which determine your armor class. You gain no benefit from wearing armor, but if you are using a shield, you apply its bonus as normal.\n\tYou can alter your body to enter different defensive modes; each time you finish a long rest, choose one mode to adopt from the Integrated Protection table, provided you meet the mode’s prerequisite.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write\nCommon.',
                },
            },
            {
                trait: {
                    name: 'Subrace',
                    description:
                        'As a warforged, your body was designed for a specific purpose. Choose one of these subraces: envoy, juggernaut, or skirmisher.',
                },
            },
        ],
    },
    28: {
        id: 28,
        name: 'Centaur',
        speed: 40,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/centaur.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Strength score increases by 2, and your Wisdom score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description: 'Centaurs mature and age at about the same rate as humans.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Centaurs are inclined toward neutrality. Those who join the Selesnya are more often neutral good, while those who join the Gruul are typically chaotic neutral.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Centaurs stand between 6 and 7 feet tall, with their equine bodies reaching about 4 feet at the withers. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 40 feet.',
                },
            },
            {
                trait: {
                    name: 'Fey',
                    description: 'Your creature type is fey, rather than humanoid.',
                },
            },
            {
                trait: {
                    name: 'Charge',
                    description:
                        'If you move at least 30 feet straight toward a target and then hit it with a melee weapon attack on the same turn, you can immediately follow that attack with a bonus action, mak i ng one attack against the target with your hooves.',
                },
            },
            {
                trait: {
                    name: 'Hooves',
                    description:
                        'Your hooves are natural melee weapons, which you can use to make unarmed strikes. If you hit with them, you deal bludgeoning damage equal to ld4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.',
                },
            },
            {
                trait: {
                    name: 'Equine Build',
                    description:
                        'You count as one size larger when determining your carrying capacity and the weight you can push or drag.\n\tIn addition, any climb that requires hands and feet is especially difficult for you because of you r equine legs. When you make such a climb, each foot of movement costs you 4 extra feet, instead of the norma l 1 extra foot.',
                },
            },
            {
                trait: {
                    name: 'Survivor',
                    description:
                        'You have proficiency in one of the following skills of your choice: Animal Handling, Medicine, Nature, or Survival.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description:
                        'You can speak, read, and write Common and Sylvan. Sylvan is widely spoken in the Selesnya Conclave, for it is rich in vocabulary to describe natural phenomena and spiritual forces.',
                },
            },
        ],
    },
    29: {
        id: 29,
        name: 'Loxodon',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/loxodon.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Constitution score in creases by 2, and your Wisdom score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Loxodon s physically mature at the same rate as humans, but they live about 450 years. They highly value the weight of wisdom and experience and are considered young until they reach the age of 60.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Most loxodons are lawful, believing in the va lue of a peace ful, ordered life. They also tend toward good.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Loxodons stand between 7 and 8 feet tall. Their massive bodies weigh between 300 and 400 pounds. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Powerful Build',
                    description:
                        'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
                },
            },
            {
                trait: {
                    name: 'Loxodon Serenity',
                    description: 'You have advantage on saving throws against being charmed or frightened.',
                },
            },
            {
                trait: {
                    name: 'Natural Armor',
                    description:
                        "You have thick, leathery skin. When you aren't wearing armor, your AC is 12 +your Constitution modifier. You can use your natural armor to determine your AC if the a r mor you wear would leave you with a lower AC. A shield's benefits apply as normal while you use your natural armor.",
                },
            },
            {
                trait: {
                    name: 'Trunk',
                    description:
                        "You can grasp things with your trunk, and you can use it as a snorkel. lt has a reach of 5 feet, and it can lift a number of pounds equal to five times your Strength score. You can use it to do the following simple tasks: lift, drop, hold, push, or pull an object or a creature; open or close a door or a container; grapple someone; or make an unarmed strike. Your DM might allow other simple tasks to be added to that list of options.\n\tYour trunk can't wield weapons or shields or do anything that requires manual precision, such as using tools or magic items or performing the somatic components of a spell.",
                },
            },
            {
                trait: {
                    name: 'Keen Smell',
                    description:
                        'Thanks to your sensitive trunk, you have advantage on Wisdom (Perception), Wisdom (Survival), and Intelligence (Investigation) checks that involve smell.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and Loxodon.',
                },
            },
        ],
    },
    30: {
        id: 30,
        name: 'Minotaur',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/minotaur.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Strength score increases by 2, and your Constitution score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description: 'Minotaurs mature and age at about the same rate as humans.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Most minotaurs who join the Boros Legion lean toward lawful alignments, while those associated with the Cult of Rakdos or the Gruul Clans tend toward chaotic alignments.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Minotaurs average over 6 feet in height, and they have stocky builds. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Horns',
                    description:
                        'Your horns are natural melee weapons, which you can use to make unarmed strikes. If you hit with them, you deal piercing damage equal to ld6 + your Strength modifier. instead of the bludgeoning damage normal for an unarmed strike.',
                },
            },
            {
                trait: {
                    name: 'Goring Rush',
                    description:
                        'Immediately after you use the Dash action on your turn and move at least 20 feet, you can make one melee attack with your horns as a bonus action.',
                },
            },
            {
                trait: {
                    name: 'Hammering Horns',
                    description:
                        'Immediately after you hit a creature with a melee attack as part of the Attack action on your turn, you can use a bonus action to attempt to shove that target with your horns. The target must be no more than one size larger than you and within 5 feet of you. Unless it succeeds on a Strength saving throw against a DC equal to 8 + your proficiency bonus + your Strength modifier, you push it up to 10 feet away from you.',
                },
            },
            {
                trait: {
                    name: 'Imposing Presence',
                    description:
                        'You have proficiency in one of the following skills of your choice: Intimidation or Persuasion.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and Minotaur.',
                },
            },
        ],
    },
    31: {
        id: 31,
        name: 'Simic Hybrid',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/simic-hybrid.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description:
                        'Your Constitution score increases by 2, and one other ability score of your choice increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Hybrids begin their lives as adult humans, elves, or vedalken. They age at a slightly accelerated rate, so their maximum life spans are probably reduced somewhat. The Guardian Project has not been operating long enough to observe the full effect of this phenomenon.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        "Most hybrids share the generally neutral out look of the Simic Combine. They are more interested in scientific research and the standing of their guild than in moral or ethical questions. Those who leave the Combine, however. often do so because their philosophical outlook and alignment are more in line with a different guild's.",
                },
            },
            {
                trait: {
                    name: 'Size',
                    description: 'Your size is Medium, within the normal range of your humanoid base r ace.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Darkvision',
                    description:
                        "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common and your choice of Elvish or Vedalken.',
                },
            },
            {
                trait: {
                    name: 'Animal Enhancement',
                    description:
                        "Your body has been altered to incorporate certain animal characteristics. You choose one animal enhancement now and a second enhancement at 5th level.\n\tAt 1st level, choose one of the following options:\n<strong>Manta Glide.</strong>You have ray-like fins that you can use as wings to slow your fall or allow you to glide. When you fall and aren't incapacitated, you can subtract up to100 feet from the fall when calculating falling damage, and you can move up to 2 feet horizontally for every 1foot you descend.\n<strong>Nimble Climber</strong>You have a climbing speed equal to your walking speed.\n<strong>Underwater Adaptation.</strong>You can breathe air and water, and you have a swimming speed equal to your walking speed.\n\tAt 5th level, your body evolves further, developing new characteristics. Choose one of the options you didn't take at 1st level, or one of the following options:\n<strong>Grappling Appendages.</strong>You have two special appendages growing alongside your arms. Choose whether they're both claws or tentacles. As an action, you can use one of them to try to grapple a creature. Each one is also a natural weapon, which you can use to make an unarmed strike. If you hit with it, the target takes bludgeoning damage equal to ld6 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike. Immediately after hitting, you can try to grapple the target as a bonus action. These appendages can't precisely manipulate anything and can't wield weapons, magic items, or other specialized equipment.\n<strong>Carapace.</strong>Your skin in places is covered by a thick shell. You gain a +1 bonus to AC when you're not wearing heavy armor.\n<strong>Acid Spit.</strong>As an action, you can spray acid from glands in your mouth, targeting one creature or object you can see within 30 feet of you. The target takes 2d10 acid damage unless it succeeds on a Dexterity saving throw against a DC equal to 8 + your Constitution modifier + your proficiency bonus. This damage increases by ldlO when you reach 11th level (3dl0) and 17th level (4d 10). You can use this trait a number of times equal to your Constitution modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.",
                },
            },
        ],
    },
    32: {
        id: 32,
        name: 'Vedalken',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/vedalken.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Intelligence score increases by 2, and your Wisdom score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Vedalken mature slower than humans do, reaching maturity around age 40. Their life span is typically 350 years, with some living to the age of 500.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description: 'Vedalken are usually lawful and non-evil.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Tall and slender, Vedalken stand 6 to 6.5 feet tall on average and usually weigh less than 200 pounds. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Vedalken Dispassion',
                    description: 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws.',
                },
            },
            {
                trait: {
                    name: 'Tireless Precision',
                    description:
                        "You are proficient in one of the following skills of your choice: Arcana, History, Investigation, Medicine, Performance, or Sleight of Hand. You are also proficient with one tool of your choice. Whenever you make an ability check with the chosen skill or tool, roll a d4 and add the number rolled to the check's total.",
                },
            },
            {
                trait: {
                    name: 'Partially Amphibious',
                    description:
                        "By absorbing oxygen through your skin, you can breathe underwater for up to 1 hour. Once you've reached that limit, you can't use this trait again until you finish a long rest.",
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description:
                        'You can speak, read, and write Common, Vedalken, and one other language of your choice.',
                },
            },
        ],
    },
    33: {
        id: 33,
        name: 'Aarakocra',
        speed: 25,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/aarakocra.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Dexterity score increases by 2, and your Wisdom score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Aarakocra reach maturity by age 3. Compared to humans, aarakocra don’t usually live longer than 30 years.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Most aarakocra are good and rarely choose sides when it comes to law and chaos. Tribal leaders and warriors might be lawful, while explorers and adventurers might tend toward chaotic.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Aarakocra are about 5 feet tall. They have thin, lightweight bodies that weigh between 80 and 100 pounds. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 25 feet.',
                },
            },
            {
                trait: {
                    name: 'Flight',
                    description:
                        'You have a flying speed of 50 feet. To use this speed, you can’t be wearing medium or heavy armor.',
                },
            },
            {
                trait: {
                    name: 'Talons',
                    description:
                        'You are proficient with your unarmed strikes, which deal 1d4 slashing damage on a hit.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description: 'You can speak, read, and write Common, Aarakocra, and Auran.',
                },
            },
        ],
    },
    34: {
        id: 34,
        name: 'Deep Gnome',
        speed: 25,
        size: Size.SMALL,
        imageUrl: 'http://localhost:8080/assets/images/races/deep-gnome.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Intelligence score increases by 2, and your Dexterity score increases by 1.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Deep gnomes are short-lived for gnomes. They mature at the same rate humans do and are considered full-grown adults by 25. They live 200 to 250 years, although hard toil and the dangers of the Underdark often claim them before their time.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description:
                        'Svirfneblin believe that survival depends on avoiding entanglements with other creatures and not making enemies, so they favor neutral alignments. They rarely wish others ill, and they are unlikely to take risks on behalf of others.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'A typical svirfneblin stands about 3 to 3.5 feet tall and weighs 80 to 120 pounds. Your size is Small.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 25 feet.',
                },
            },
            {
                trait: {
                    name: 'Superior Darkvision',
                    description: 'Your darkvision has a radius of 120 feet.',
                },
            },
            {
                trait: {
                    name: 'Gnome Cunning',
                    description:
                        'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.',
                },
            },
            {
                trait: {
                    name: 'Sone Camouflage',
                    description: 'You have advantage on Dexterity (stealth) checks to hide in rocky terrain.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description:
                        'You can speak, read, and write Common, Gnomish, and Undercommon. The svirfneblin dialect is more guttural than surface Gnomish, and most svirfneblin know only a little bit of Common, but those who deal with outsiders (and that includes you as an adventurer) pick up enough Common to get by in other lands.',
                },
            },
        ],
    },
    35: {
        id: 35,
        name: 'Genasi',
        speed: 30,
        size: Size.MEDIUM,
        imageUrl: 'http://localhost:8080/assets/images/races/genasi.png',
        traits: [
            {
                trait: {
                    name: 'Ability Score Increase',
                    description: 'Your Constitution score increases by 2.',
                },
            },
            {
                trait: {
                    name: 'Age',
                    description:
                        'Genasi mature at about the same rate as humans and reach adulthood in their late teens. They live somewhat longer than humans do, up to 120 years.',
                },
            },
            {
                trait: {
                    name: 'Alignment',
                    description: 'Independent and self-reliant, genasi tend toward a neutral alignment.',
                },
            },
            {
                trait: {
                    name: 'Size',
                    description:
                        'Genasi are as varied as their mortal parents but are generally built like humans, standing anywhere from 5 feet to over 6 feet tall. Your size is Medium.',
                },
            },
            {
                trait: {
                    name: 'Speed',
                    description: 'Your base walking speed is 30 feet.',
                },
            },
            {
                trait: {
                    name: 'Languages',
                    description:
                        'You can speak, read, and write Common and Primordial. Primordial is a guttural language, filled with harsh syllables and hard consonants.',
                },
            },
            {
                trait: {
                    name: 'Subrace',
                    description:
                        'Four major subraces of genasi are found among the worlds of D&D: air genasi, earth genasi, fire genasi, and water genasi. Choose one of these subraces.',
                },
            },
        ],
    },
};
