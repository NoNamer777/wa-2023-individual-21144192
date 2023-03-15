import { MIN_ENTITY_DESCRIPTION_LENGTH, MIN_ENTITY_NAME_LENGTH, Race, SIZE_VALUES } from '@dnd-mapp/data';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import Joi, { AnySchema, CustomHelpers } from 'joi';

function imageUrlValidator(value: string, helper: CustomHelpers<string>) {
    // TODO: Resolve the server protocol(http|https)/host(/port) based on the environment
    const base = 'http://localhost:8080/assets/images/races/';

    value = value.trim();

    if (!value.startsWith(base)) {
        return helper.error('serve-url.base');
    }
    value = value.replace(base, '');
    if (!value.match(/^([a-z|A-Z|0-9|\-_ ])*(\.)(png|jpg)$/)) {
        return helper.error('serve-url.image-path');
    }
    return helper.original;
}

function sizeValuesString() {
    let value = '[';

    for (const size of SIZE_VALUES) {
        value += size;

        if (SIZE_VALUES[SIZE_VALUES.length - 1] !== size) {
            value += ', ';
        }
    }
    return value + ']';
}

const baseIdAttributeSchema = Joi.number().integer().greater(0);
const nameAttributeSchema = (entityType: string) =>
    Joi.string()
        .trim()
        .min(MIN_ENTITY_NAME_LENGTH)
        .required()
        .messages({
            'any.required': `Please, provide the name of the ${entityType}.`,
            'string.base': `Please, provide a valid string as name of the ${entityType}.`,
            'string.empty': `Please, provide at least ${MIN_ENTITY_NAME_LENGTH} characters for the name of a ${entityType}.`,
            'string.min': `Please, provide at least ${MIN_ENTITY_NAME_LENGTH} characters for the name of a ${entityType}.`,
        });
const descriptiveAttributeSchema = (entityType: string) =>
    Joi.string()
        .exist()
        .allow(null)
        .trim()
        .min(MIN_ENTITY_DESCRIPTION_LENGTH)
        .messages({
            'any.required': `Please, provide a description of a ${entityType}.`,
            'string.base': `Please, provide a valid string as description of a ${entityType}.`,
            'string.empty': `Please, provide at least ${MIN_ENTITY_DESCRIPTION_LENGTH} characters for the description of a ${entityType}.`,
            'string.min': `Please, provide at least ${MIN_ENTITY_DESCRIPTION_LENGTH} characters for the description of a ${entityType}.`,
        });

const baseRaceDataSchema = Joi.object({
    name: nameAttributeSchema('Race'),
    speed: Joi.number().integer().min(0).required().messages({
        'any.required': 'Please, provide the speed of the Race.',
        'number.integer': `Please, provide a whole number equal to or higher than '0' for the speed of the Race.`,
        'number.min': `Please, provide a whole number equal to or higher than '{#limit}' for the speed of the Race.`,
        'integer.base': 'Please, provide a whole number for the speed of the Race',
    }),
    size: Joi.string()
        .trim()
        .valid(...SIZE_VALUES)
        .required()
        .messages({
            'any.required': 'Please, provide the Size of the Race.',
            'any.only': `Please, provide a valid Size value of the race. ({#valids})`,
            'string.base': `Please, provide a valid Size value of the race. (${sizeValuesString()})`,
        }),
    imageUrl: Joi.string().trim().custom(imageUrlValidator).required().messages({
        'any.required': `Please, provide the 'imageUrl' of the Race.`,
        'string.base': `Please, provide a valid url value for the 'imageUrl'.`,
        'string.empty': `Please, provide a valid url value for the 'imageUrl'.`,
        'serve-url.base': `The image URL doesn't originate from the server.`,
        'serve-url.image-path': `The image url path doesn't point to a valid image file pattern`,
    }),
});

export const existingRaceDataSchema = baseRaceDataSchema.append({
    id: baseIdAttributeSchema.required().messages({
        'any.required': 'Please, provide the ID of the Race.',
        'number.base': 'Please, provide a whole number as the ID of the Race.',
        'number.greater': `Please, provide a whole number as the ID of the Race which is greater than '{#limit}'.`,
        'number.integer': `Please, provide a whole number as the ID of the Race which is greater than '0'.`,
    }),
    traits: Joi.array()
        .required()
        .items(
            Joi.object({
                trait: Joi.object({
                    id: baseIdAttributeSchema.required().messages({
                        'any.required': 'Please, provide the ID of a trait.',
                        'number.base': 'Please, provide a whole number as the ID of a Trait.',
                        'number.greater': `Please, provide a whole number as the ID of a Trait which is greater than '{#limit}'.`,
                        'number.integer': `Please, provide a whole number as the ID of a Trait which is greater than '0'.`,
                    }),
                    name: nameAttributeSchema('Trait'),
                    description: descriptiveAttributeSchema('Trait'),
                })
                    .required()
                    .messages({
                        'any.required': 'Please, provide the trait of the Racial Trait.',
                        'object.base': 'Please, provide a valid trait object value for a Racial Trait.',
                    }),
                description: descriptiveAttributeSchema('Racial Trait'),
            })
        )
        .messages({
            'any.required': 'Please, provide the traits of the Race.',
            'array.base': 'Please, provide a valid list value for the traits of the Race.',
            'array.min': 'Please, provide at least one trait of the Race.',
        }),
});

export const createRaceDataSchema = baseRaceDataSchema.append({
    traits: Joi.array()
        .required()
        .items({
            trait: {
                id: baseIdAttributeSchema.optional(),
                name: nameAttributeSchema('Trait'),
                description: descriptiveAttributeSchema('Trait'),
            },
            description: descriptiveAttributeSchema('Racial Trait'),
        }),
});

@Injectable()
export class RaceValidationPipe implements PipeTransform {
    constructor(private schema: AnySchema) {}

    transform(value: Race): Race {
        if (!(value instanceof Race)) {
            return value;
        }
        const { error } = this.schema.validate(value);

        if (error) {
            throw new BadRequestException(error.message);
        }
        return value;
    }
}
