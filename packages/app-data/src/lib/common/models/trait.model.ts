import { ApiProperty } from '@nestjs/swagger';

export class Trait {
    @ApiProperty({ name: 'id', type: Number, minimum: 1 })
    id: number;

    @ApiProperty({ name: 'name', type: String, description: 'The name of a Trait' })
    name: string;

    @ApiProperty({
        name: 'description',
        type: String,
        nullable: true,
        description: 'A text describing what a Trait does, which is specific to this Trait only.',
    })
    description?: string;
}
