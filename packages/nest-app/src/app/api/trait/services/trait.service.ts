import { Trait } from '@dnd-mapp/data';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTraitData, TraitSchema } from '../trait.schema';

@Injectable()
export class TraitService {
    constructor(@InjectRepository(TraitSchema) private traitRepository: Repository<Trait>) {}

    async getAll(): Promise<Trait[]> {
        return await this.traitRepository.find();
    }

    async getById(traitId: number): Promise<Trait> {
        const traitById = await this.traitRepository.findOneBy({ id: traitId });

        if (traitById === null) {
            throw new NotFoundException(`Trait with ID: '${traitId}' does not exist.`);
        }
        return traitById;
    }

    async getByName(traitName: string): Promise<Trait> {
        const traitByName = await this.traitRepository.findOneBy({ name: traitName });

        if (traitByName === null) {
            throw new NotFoundException(`Trait with name: '${traitName}' does not exist.`);
        }
        return traitByName;
    }

    async update(traitData: Trait): Promise<Trait> {
        if (!(await this.doesTraitExistById(traitData.id))) {
            throw new NotFoundException(`Cannot update Trait with ID: '${traitData.id}' because it does not exist.`);
        }
        if (await this.doesTraitExistByName(traitData.name)) {
            throw new BadRequestException(
                `Cannot update Trait with ID: '${traitData.id}' because the name is already in use.`
            );
        }
        await this.traitRepository.update({ id: traitData.id }, traitData);

        return this.getById(traitData.id);
    }

    async create(traitData: CreateTraitData): Promise<Trait> {
        if (await this.doesTraitExistByName(traitData.name)) {
            throw new BadRequestException(
                `Cannot create a new Trait with name: '${traitData.name}' because a Trait already exists by that name.`
            );
        }
        await this.traitRepository.insert(traitData);
        return await this.getByName(traitData.name);
    }

    async deleteById(traitId: number): Promise<void> {
        if (!(await this.doesTraitExistById(traitId))) {
            throw new BadRequestException(`Cannot delete Trait with ID: '${traitId}' because it does not exist.`);
        }
        }
        await this.traitRepository.delete({ id: traitId });
    }

    private async doesTraitExistById(traitId: number): Promise<boolean> {
        try {
            await this.getById(traitId);
            return true;
        } catch (error: unknown) {
            if (!(error instanceof NotFoundException)) {
                throw error;
            }
            return false;
        }
    }

    private async doesTraitExistByName(traitName: string): Promise<boolean> {
        try {
            await this.getByName(traitName);
            return true;
        } catch (error: unknown) {
            if (error instanceof NotFoundException) {
                return false;
            }
            throw error;
        }
    }
}
