import { Module } from '@nestjs/common';
import { AssetHandlingController } from './asset-handling.controller';

@Module({
    controllers: [AssetHandlingController],
})
export class AssetHandlingModule {}
