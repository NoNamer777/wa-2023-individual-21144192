import { MIN_ENTITY_DESCRIPTION_LENGTH, MIN_ENTITY_NAME_LENGTH, Race, SIZE_VALUES } from '@dnd-mapp/data';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import Joi, { AnySchema, CustomHelpers } from 'joi';

function imageUrlValidator(value: string, helper: CustomHelpers<string>) {
    // TODO: Resolve the server protocol(http|https)/host(/port) based on the environment
    const base = 'http://localhost:8080/assets/images/';

    value = value.trim();

    if (!value.startsWith(base)) {
        throw new Error(`The image URL doesn't originate from this server.`);
    }
    value = value.replace(base, '');
    if (!value.match(/^([a-z|A-Z|0-9|\-_ ])*(\.)(png|jpg)$/)) {
        throw new Error(`The image url doesn't point to a valid image file pattern`);
    }
    return helper.original;
}

const baseIdAttributeSchema = Joi.number().integer().greater(0);
const nameAttributeSchema = Joi.string().trim().min(MIN_ENTITY_NAME_LENGTH).required();
const descriptiveAttributeSchema = Joi.string().trim().min(MIN_ENTITY_DESCRIPTION_LENGTH).optional();

const baseRaceDataSchema = Joi.object().keys({
    name: nameAttributeSchema,
    speed: Joi.number().integer().required(),
    size: Joi.string()
        .allow(...SIZE_VALUES)
        .required(),
    imageUrl: Joi.string().custom(imageUrlValidator).required(),
});

export const existingRaceDataSchema = baseRaceDataSchema.append({
    id: baseIdAttributeSchema.required(),
    traits: Joi.array()
        .items({
            trait: {
                id: baseIdAttributeSchema.required(),
                name: descriptiveAttributeSchema,
                description: descriptiveAttributeSchema,
            },
            description: descriptiveAttributeSchema,
        })
        .required(),
});

export const createRaceDataSchema = baseRaceDataSchema.append({
    traits: Joi.array()
        .items({
            trait: {
                id: baseIdAttributeSchema.optional(),
                name: descriptiveAttributeSchema,
                description: descriptiveAttributeSchema,
            },
            description: descriptiveAttributeSchema,
        })
        .required(),
});

@Injectable()
export class RaceValidationPipe implements PipeTransform {
    constructor(private schema: AnySchema) {}

    transform(value: Race): Race {
        const { error } = this.schema.validate(value);

        if (error) {
            throw new BadRequestException({
                errors: error,
            });
        }
        return value;
    }
}
