import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app';
import { setupSwaggerModule } from './app/configs';
import { environment } from './environments/environment';

const DEFAULT_SERVER_HOSTNAME = 'localhost';
const DEFAULT_SERVER_PORT = 8080;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const { host, port, secure } = {
        host: DEFAULT_SERVER_HOSTNAME,
        port: DEFAULT_SERVER_PORT,
        secure: false,
        ...environment.server,
    };

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    setupSwaggerModule(app);

    await app.listen(port, host);

    Logger.log(`Application is running on: http://${host}:${port}/`);
}

bootstrap();
