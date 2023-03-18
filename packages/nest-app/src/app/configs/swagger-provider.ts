import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
    .setTitle('DnD Mapp - Races')
    .setDescription(
        'A server providing a collection of part of all the available Race options in Dungeons and Dragons 5th edition when a player is creating a new playable character.'
    )
    .setVersion('v0.0.1')
    .addTag('api/race')
    .addTag('api/trait')
    .addTag('assets')
    .setContact('Oscar Wellner', 'https://github.com/nonamer777', 'oscar.wellner@gmail.com')
    .build();

export function setupSwaggerModule(app): void {
    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api', app, swaggerDoc);
}
