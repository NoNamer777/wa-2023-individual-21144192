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
} from '@nestjs/common';
import { RaceService } from '../services/race.service';
import {
    CreateRaceData,
    DEFAULT_PAGE_SIZE,
    DEFAULT_SORT_ORDER,
    DEFAULT_SORTING_BY_ATTRIBUTE,
    PaginationResponse,
    Race,
    SortableAttribute,
    SortOrder,
} from '../../common/models';
import { ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

@ApiTags('api/race')
@Controller({
    path: 'api/race',
})
export class RaceController {
    constructor(private raceService: RaceService) {}

    @Get()
    getAll(
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
    ): PaginationResponse<Race> {
        return this.raceService.getAll(page, pageSize, order, sortByAttribute, hasTrait);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) idPath: number, @Body() raceData: Race): Race {
        if (raceData.id !== idPath) {
            throw new BadRequestException(
                `Cannot update Race on path: '${idPath}' with data from Race with ID: '${raceData.id}'.`
            );
        }
        return this.raceService.update(raceData);
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) idPath: number): Race {
        return this.raceService.getById(idPath);
    }

    @Post()
    @HttpCode(HttpStatusCode.Created)
    create(@Body() raceData: CreateRaceData): Race {
        return this.raceService.create(raceData);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) idPath: number): void {
        this.raceService.deleteById(idPath);
    }
}
