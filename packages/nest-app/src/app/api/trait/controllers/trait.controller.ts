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
import { HttpStatusCode } from 'axios';
import { TraitService } from '../services/trait.service';
import { CreateTraitData, Trait } from '../../common/models';

@Controller('api/trait')
export class TraitController {
    constructor(private traitService: TraitService) {}

    @Get()
    async getAll(): Promise<Trait[]> {
        return await this.traitService.getAll();
    }

    @Get(':id')
    async getById(@Param('id', new ParseIntPipe()) idPath: number): Promise<Trait> {
        return await this.traitService.getById(idPath);
    }

    @Put(':id')
    async update(@Param('id', new ParseIntPipe()) idPath: number, @Body() traitData: Trait): Promise<Trait> {
        if (traitData.id !== idPath) {
            throw new BadRequestException(
                `Cannot update Trait on path: '${idPath}' with data from Trait with ID: '${traitData.id}'.`
            );
        }
        return await this.traitService.update(traitData);
    }

    @Post()
    @HttpCode(HttpStatusCode.Created)
    async create(@Body() traitData: CreateTraitData): Promise<Trait> {
        return await this.traitService.create(traitData);
    }

    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) idPath: number): Promise<void> {
        await this.traitService.deleteById(idPath);
    }
}
