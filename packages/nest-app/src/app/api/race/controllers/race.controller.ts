import {
    DEFAULT_PAGE_SIZE,
    DEFAULT_SORT_ORDER,
    DEFAULT_SORTING_BY_ATTRIBUTE,
    PaginationResponse,
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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { RaceService } from '../services/race.service';
import { CreateRaceData } from '../race.schema';
import { RaceResponseInterceptor } from '../interceptors/race-response.interceptor';

@ApiTags('api/race')
@Controller({
    path: 'api/race',
})
export class RaceController {
    constructor(private raceService: RaceService) {}

    @Get()
    async getAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('pageSize', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) pageSize: number,
        @Query('order', new DefaultValuePipe(DEFAULT_SORT_ORDER), new ParseEnumPipe(SortOrder)) order: SortOrder,
        @Query(
            'sortByAttribute',
            new DefaultValuePipe(DEFAULT_SORTING_BY_ATTRIBUTE),
            new ParseEnumPipe(SortableAttribute)
        )
        sortByAttribute: SortableAttribute,
        @Query('hasTrait', new DefaultValuePipe(null)) hasTrait: string
    ): Promise<PaginationResponse<Race>> {
        return await this.raceService.getAll(page, pageSize, order, sortByAttribute, hasTrait);
    }

    @UseInterceptors(RaceResponseInterceptor)
    @Get(':id')
    async getById(@Param('id', ParseIntPipe) idPath: number): Promise<Race> {
        return await this.raceService.getById(idPath);
    }

    @UseInterceptors(RaceResponseInterceptor)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) idPath: number, @Body() raceData: Race): Promise<Race> {
        if (raceData.id !== idPath) {
            throw new BadRequestException(
                `Cannot update Race on path: '${idPath}' with data from Race with ID: '${raceData.id}'.`
            );
        }
        return await this.raceService.update(raceData);
    }

    @UseInterceptors(RaceResponseInterceptor)
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
