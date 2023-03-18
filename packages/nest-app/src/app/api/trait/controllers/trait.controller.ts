import { Trait } from '@dnd-mapp/data';
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { TraitService } from '../services/trait.service';
import { CreateTraitData } from '../trait.schema';

@ApiTags('api/trait')
@Controller('api/trait')
export class TraitController {
    constructor(private traitService: TraitService) {}

    @ApiOkResponse({ description: 'All Traits have been successfully retrieved.', type: [Trait] })
    @Get()
    async getAll(): Promise<Trait[]> {
        return await this.traitService.getAll();
    }

    @ApiParam({ name: 'id', type: Number, required: true, description: 'The ID of the Trait to get.' })
    @ApiOkResponse({ description: 'The Trait has been successfully retrieved.', type: Trait })
    @ApiNotFoundResponse({ description: 'Could not retrieve the Trait.' })
    @ApiBadRequestResponse({
        description: 'Something went wrong while trying to retrieve a Trait, which can be resolved by the User.',
    })
    @Get(':id')
    async getById(@Param('id', new ParseIntPipe()) idPath: number): Promise<Trait> {
        return await this.traitService.getById(idPath);
    }

    @ApiParam({ name: 'id', type: Number, required: true, description: 'The ID of the Trait to update.' })
    @ApiOkResponse({ description: 'The Trait has been successfully updated.', type: Trait })
    @ApiNotFoundResponse({ description: 'Could not update a Trait because it was not found. ' })
    @ApiBadRequestResponse({
        description: 'Something went wrong while trying to update a Trait, which can be resolved by the User.',
    })
    @Put(':id')
    async update(@Param('id', new ParseIntPipe()) idPath: number, @Body() traitData: Trait): Promise<Trait> {
        if (traitData.id !== idPath) {
            throw new BadRequestException(
                `Cannot update Trait on path: '${idPath}' with data from Trait with ID: '${traitData.id}'.`
            );
        }
        return await this.traitService.update(traitData);
    }

    @ApiCreatedResponse({ description: 'A Trait has been created.' })
    @ApiBadRequestResponse({
        description: 'Something went wrong while trying to create a Trait, which can be resolved by the User.',
    })
    @Post()
    @HttpCode(HttpStatusCode.Created)
    async create(@Body() traitData: CreateTraitData): Promise<Trait> {
        return await this.traitService.create(traitData);
    }

    @ApiParam({ name: 'id', type: Number, required: true, description: 'The ID of the Trait to remove.' })
    @ApiOkResponse({ description: 'A Trait has been removed.' })
    @ApiNotFoundResponse({ description: 'No Trait has been found to remove.' })
    @ApiBadRequestResponse({
        description: 'Something went wrong while trying to remove a Trait, which can be resolved by the User.',
    })
    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) idPath: number): Promise<void> {
        await this.traitService.deleteById(idPath);
    }
}
