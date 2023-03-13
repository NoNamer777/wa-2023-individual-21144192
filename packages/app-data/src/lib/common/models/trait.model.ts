export class Trait {
    // @IsInt()
    // @IsPositive()
    id?: number;

    // @IsNotEmpty()
    // @IsString()
    // @MinLength(MIN_ENTITY_NAME_LENGTH)
    name: string;

    // @IsNotEmpty()
    // @IsString()
    // @MinLength(MIN_ENTITY_DESCRIPTION_LENGTH)
    description?: string;
}
