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
import { RaceService } from '../services/race.service';
import { CreateRaceData, PaginationResponse, Race } from '../../common/models';
import { ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

@ApiTags('api/race')
@Controller({
    path: 'api/race',
})
export class RaceController {
    constructor(private raceService: RaceService) {}

    @Get()
    getAll(): PaginationResponse<Race> {
        return this.raceService.getAll();
    }

    @Get(':id')
    getById(@Param('id', new ParseIntPipe()) idPath: number): Race {
        return this.raceService.getById(idPath);
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) idPath: number, @Body() raceData: Race): Race {
        if (raceData.id !== idPath) {
            throw new BadRequestException(
                `Cannot update Race on path: '${idPath}' with data from Race with ID: '${raceData.id}'.`
            );
        }
        return this.raceService.update(raceData);
    }

    @Post()
    @HttpCode(HttpStatusCode.Created)
    create(@Body() raceData: CreateRaceData): Race {
        return this.raceService.create(raceData);
    }

    @Delete(':id')
    delete(@Param('id', new ParseIntPipe()) idPath: number): void {
        this.raceService.deleteById(idPath);
    }
}
