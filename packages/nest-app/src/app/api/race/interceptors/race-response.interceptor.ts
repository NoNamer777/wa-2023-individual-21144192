import { PaginationResponse, Race } from '@dnd-mapp/data';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { buildServerUrl, DEFAULT_SERVER_HOSTNAME, DEFAULT_SERVER_PORT } from '../../../shared/constants';
import { RacialTraitRelation } from '../racial-trait.schema';

@Injectable()
export class RaceResponseInterceptor<T> implements NestInterceptor<T>, OnModuleInit {
    private configService: ConfigService;

    constructor(private moduleRef: ModuleRef) {}

    async onModuleInit(): Promise<void> {
        this.configService = this.moduleRef.get(ConfigService, { strict: false });
    }

    intercept(context: ExecutionContext, callHandler: CallHandler): Observable<T> {
        return callHandler.handle().pipe(
            map((data: T) => {
                if (data instanceof PaginationResponse<Race>) {
                    data.results = data.results.map((race) => this.patchIndividualRace(race));
                    return data as T;
                }
                return this.patchIndividualRace(data as Race) as T;
            })
        );
    }

    private patchIndividualRace(raceData: Race): Race {
        if (!raceData) return raceData;

        raceData.imageUrl =
            buildServerUrl({
                ...this.configService.get('server', {
                    host: DEFAULT_SERVER_HOSTNAME,
                    port: DEFAULT_SERVER_PORT,
                    secure: false,
                }),
            }) + raceData.imageUrl;

        for (const racialTrait of (raceData.traits as RacialTraitRelation[]) ?? []) {
            delete racialTrait._raceId;
            delete racialTrait._traitId;
        }
        return raceData;
    }
}
