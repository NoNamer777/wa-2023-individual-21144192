import { Module } from '@nestjs/common';
import { AssetHandlingController } from './controllers/asset-handling.controller';

@Module({
    controllers: [AssetHandlingController],
})
export class AssetHandlingModule {}
