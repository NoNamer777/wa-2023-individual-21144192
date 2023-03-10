import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RaceService } from '../services/race.service';
import { CreateRaceData, Race } from '../models/race.model';
import { ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

@ApiTags('api/race')
@Controller({
    path: 'api/race',
})
export class RaceController {
    constructor(private raceService: RaceService) {}

    @Get()
    getAll(): Race[] {
        return this.raceService.getAll();
    }

    @Get(':id')
    getById(@Param('id', new ParseIntPipe()) idPath: number): Race {
        return this.raceService.getById(idPath);
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
