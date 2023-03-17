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
import { ApiTags } from '@nestjs/swagger';
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
export class RaceController {
    constructor(private raceService: RaceService) {}

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

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) idPath: number): Promise<Race> {
        return await this.raceService.getById(idPath);
    }

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

    @UsePipes(new RaceValidationPipe(createRaceDataSchema))
    @Post()
    @HttpCode(HttpStatusCode.Created)
    async create(@Body() raceData: CreateRaceData): Promise<Race> {
        return await this.raceService.create(raceData);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) idPath: number): Promise<void> {
        await this.raceService.deleteById(idPath);
    }
}
