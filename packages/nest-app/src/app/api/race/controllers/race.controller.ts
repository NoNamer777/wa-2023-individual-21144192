import {
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
    DEFAULT_SORT_BY_ATTRIBUTE,
    DEFAULT_SORT_ORDER,
    PaginationResponse,
    QueryParamKeys,
    Race,
    SortableAttribute,
    SortOrder,
} from '@dnd-mapp/data';
import {
    BadRequestException,
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseEnumPipe,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseInterceptors,
    UsePipes,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { RaceResponseInterceptor } from '../interceptors/race-response.interceptor';
import { createRaceDataSchema, existingRaceDataSchema, RaceValidationPipe } from '../pipes/race-validation.pipe';
import { CreateRaceData } from '../race.schema';
import { RaceService } from '../services/race.service';

@ApiTags('api/race')
@UseInterceptors(RaceResponseInterceptor)
@Controller({
    path: 'api/race',
})
@ApiExtraModels(PaginationResponse)
export class RaceController {
    constructor(private raceService: RaceService) {}

    @ApiQuery({ name: 'page', type: Number, required: false, description: 'The slice of data to get.' })
    @ApiQuery({
        name: 'pageSize',
        type: Number,
        required: false,
        description: 'How many items are in one slice of data.',
    })
    @ApiQuery({
        name: 'order',
        enum: ['asc', 'desc'],
        enumName: 'SortOrder',
        required: false,
        description: 'In which order the data should be sorted.',
    })
    @ApiQuery({
        name: 'sortByAttribute',
        enum: ['name', 'size', 'speed'],
        required: false,
        description: 'On which attribute the data should be sorted.',
    })
    @ApiQuery({
        name: 'hasTrait',
        type: String,
        required: false,
        description: 'Filters the data on a the condition that they have a particular Trait with the provided name',
    })
    @ApiOkResponse({
        description: 'All Races are successfully returned',
        schema: {
            allOf: [
                { $ref: getSchemaPath(PaginationResponse) },
                {
                    properties: {
                        results: {
                            type: 'array',
                            items: { $ref: getSchemaPath(Race) },
                        },
                    },
                },
            ],
        },
    })
    @ApiBadRequestResponse({
        description:
            'Something went wrong while trying to get all Races within certain parameters which can be resolved by the User. ',
    })
    @Get()
    async getAll(
        @Query(QueryParamKeys.PAGE, new DefaultValuePipe(DEFAULT_PAGE), ParseIntPipe) page: number,
        @Query(QueryParamKeys.PAGE_SIZE, new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) pageSize: number,
        @Query(QueryParamKeys.SORTING_ORDER, new DefaultValuePipe(DEFAULT_SORT_ORDER), new ParseEnumPipe(SortOrder))
        order: SortOrder,
        @Query(
            QueryParamKeys.SORTING_BY_ATTRIBUTE,
            new DefaultValuePipe(DEFAULT_SORT_BY_ATTRIBUTE),
            new ParseEnumPipe(SortableAttribute)
        )
        sortByAttribute: SortableAttribute,
        @Query(QueryParamKeys.FILTER_TRAIT, new DefaultValuePipe(null)) hasTrait: string
    ): Promise<PaginationResponse<Race>> {
        return await this.raceService.getAll(page, pageSize, order, sortByAttribute, hasTrait);
    }

    @ApiParam({ name: 'id', type: Number, required: true, description: 'The ID of the Race to get.' })
    @ApiOkResponse({ description: 'A Race was found by the provided ID', type: Race })
    @ApiNotFoundResponse({ description: 'The Race by the provided ID was not found.' })
    @ApiBadRequestResponse({
        description: 'Something went wrong while trying to get a Race by ID which can be resolved by the User.',
    })
    @Get(':id')
    async getById(@Param('id', ParseIntPipe) idPath: number): Promise<Race> {
        return await this.raceService.getById(idPath);
    }

    @ApiParam({ name: 'id', type: Number, required: true, description: 'The ID of the Race to update.' })
    @ApiOkResponse({ description: 'The race was successfully updated.', type: Race })
    @ApiNotFoundResponse({ description: `Could not update a Race because it wasn't found.` })
    @ApiBadRequestResponse({
        description: 'Something went wrong while trying to update a Race which can be resolved by the User.',
    })
    @UsePipes(new RaceValidationPipe(existingRaceDataSchema))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) idPath: number, @Body() raceData: Race): Promise<Race> {
        if (raceData.id !== idPath) {
            throw new BadRequestException(
                `Cannot update Race on path: '${idPath}' with data from Race with ID: '${raceData.id}'.`
            );
        }
        return await this.raceService.update(raceData);
    }

    @ApiCreatedResponse({ description: 'A new Race was successfully created', type: Race })
    @ApiBadRequestResponse({
        description: 'Something went wrong while trying to create a new Race which can be resolved by the User.',
    })
    @UsePipes(new RaceValidationPipe(createRaceDataSchema))
    @Post()
    @HttpCode(HttpStatusCode.Created)
    async create(@Body() raceData: CreateRaceData): Promise<Race> {
        return await this.raceService.create(raceData);
    }

    @ApiParam({ name: 'id', type: Number, required: true, description: 'The ID of the Race to delete.' })
    @ApiOkResponse({ description: 'The Race is successfully removed' })
    @ApiNotFoundResponse({ description: 'Could not find the Race to remove.' })
    @ApiBadRequestResponse({
        description: 'Something went wrong while trying to remove the Race which can be resolved by the User.',
    })
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) idPath: number): Promise<void> {
        await this.raceService.deleteById(idPath);
    }
}
