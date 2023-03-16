import { Logger,ValidationPipe } from '@nestjs/common';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { join } from 'path';
import { AppModule } from './app';
import { setupSwaggerModule } from './app/configs';
import { DEFAULT_SERVER_HOSTNAME,DEFAULT_SERVER_PORT } from './app/shared/constants';
import { environment } from './environments/environment';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';

async function bootstrap() {
    // TODO: Adjustable path for Docker containers
    const applicationOptions: NestApplicationOptions = environment.server?.secure
        ? {
              httpsOptions: {
                  key: fs.readFileSync(join(__dirname, '..', '..', 'certificate-key.pem')),
                  cert: fs.readFileSync(join(__dirname, '..', '..', 'certificate.pem')),
              },
          }
        : {};

    const app = await NestFactory.create(AppModule, { ...applicationOptions });

    const { host, port, secure } = {
        host: DEFAULT_SERVER_HOSTNAME,
        port: DEFAULT_SERVER_PORT,
        secure: false,
        ...environment.server,
    };

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.enableCors({
        origin: [...(environment.server?.cors?.allowedOrigins ?? [])],
        methods: 'GET,PUT,POST,DELETE',
    });
    setupSwaggerModule(app);

    await app.listen(port, host);

    Logger.log(`Application is running on: http${secure ? 's' : ''}://${host}:${port}/`);
}

bootstrap();
