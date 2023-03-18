import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

const FILE_EXTENSION_CONTENT_TYPE_MAP = new Map([['png', 'image/png']]);

@ApiTags('assets')
@Controller('assets')
export class AssetHandlingController {
    @ApiParam({
        name: 'path',
        type: String,
        required: true,
        description: 'The path, file name, and file extension of the asset to get.',
    })
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @Get(':path*')
    getAsset(@Param() params: string[], @Res({ passthrough: true }) response: Response): StreamableFile {
        const assetPath = params['path'] + params[0];

        const fileExtension = params[0].split('.')[1];
        const fileName = params[0].replace(/.*\//g, '');

        const file = createReadStream(join(__dirname, 'assets', ...assetPath.split('/')));

        response.set({
            'Content-Type': FILE_EXTENSION_CONTENT_TYPE_MAP.get(fileExtension),
            'Content-Disposition': `attachment; filename="${fileName}"`,
        });

        return new StreamableFile(file);
    }
}
