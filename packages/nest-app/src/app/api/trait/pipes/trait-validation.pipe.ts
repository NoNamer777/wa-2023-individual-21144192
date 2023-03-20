import { MIN_ENTITY_DESCRIPTION_LENGTH, MIN_ENTITY_NAME_LENGTH, Trait } from '@dnd-mapp/data';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import Joi, { AnySchema } from 'joi';
import { CreateTraitData } from '../trait.schema';

export const createTraitDataSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(MIN_ENTITY_NAME_LENGTH)
        .required()
        .messages({
            'any.required': `Please, provide the name of the Trait.`,
            'string.base': `Please, provide a valid string as name of the Trait.`,
            'string.empty': `Please, provide at least ${MIN_ENTITY_NAME_LENGTH} characters for the name of a Trait.`,
            'string.min': `Please, provide at least ${MIN_ENTITY_NAME_LENGTH} characters for the name of a Trait.`,
        }),
    description: Joi.string()
        .exist()
        .allow(null)
        .trim()
        .min(MIN_ENTITY_DESCRIPTION_LENGTH)
        .messages({
            'any.required': `Please, provide a description of a Trait.`,
            'string.base': `Please, provide a valid string as description of a Trait.`,
            'string.empty': `Please, provide at least ${MIN_ENTITY_DESCRIPTION_LENGTH} characters for the description of a Trait.`,
            'string.min': `Please, provide at least ${MIN_ENTITY_DESCRIPTION_LENGTH} characters for the description of a Trait.`,
        }),
});

export const existingTraitDataSchema = createTraitDataSchema.append({
    id: Joi.number().integer().greater(0).required().messages({
        'any.required': 'Please, provide the ID of the Race.',
        'number.base': 'Please, provide a whole number as the ID of the Race.',
        'number.greater': `Please, provide a whole number as the ID of the Race which is greater than '{#limit}'.`,
        'number.integer': `Please, provide a whole number as the ID of the Race which is greater than '0'.`,
    }),
});

@Injectable()
export class TraitValidationPipe implements PipeTransform {
    constructor(private schema: AnySchema) {}

    transform(value: Trait): Trait {
        if (!(value instanceof CreateTraitData || value instanceof Trait)) {
            return value;
        }
        const { error } = this.schema.validate(value);

        if (error) {
            throw new BadRequestException(error.message);
        }
        return value;
    }
}
