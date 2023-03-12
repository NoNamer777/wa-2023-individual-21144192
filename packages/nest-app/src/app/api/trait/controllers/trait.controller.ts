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
import { TraitService } from '../services/trait.service';
import { HttpStatusCode } from 'axios';
import { CreateTraitData, Trait } from '../../common/models';

@Controller('trait')
export class TraitController {
    constructor(private traitService: TraitService) {}

    @Get()
    getAll(): Trait[] {
        return this.traitService.getAll();
    }

    @Get(':id')
    getById(@Param('id', new ParseIntPipe()) idPath: number): Trait {
        return this.traitService.getById(idPath);
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) idPath: number, @Body() traitData: Trait): Trait {
        if (traitData.id !== idPath) {
            throw new BadRequestException(
                `Cannot update Trait on path: '${idPath}' with data from Trait with ID: '${traitData.id}'.`
            );
        }
        return this.traitService.update(traitData);
    }

    @Post()
    @HttpCode(HttpStatusCode.Created)
    create(@Body() traitData: CreateTraitData): Trait {
        return this.traitService.create(traitData);
    }

    @Delete(':id')
    delete(@Param('id', new ParseIntPipe()) idPath: number): void {
        this.traitService.deleteById(idPath);
    }
}
