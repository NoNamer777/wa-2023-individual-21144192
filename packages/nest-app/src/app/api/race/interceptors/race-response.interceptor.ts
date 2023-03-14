import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { Race } from '@dnd-mapp/data';

@Injectable()
export class RaceResponseInterceptor implements NestInterceptor<Race> {
    intercept(context: ExecutionContext, callHandler: CallHandler): Observable<Race> {
        return callHandler.handle().pipe(
            map((raceData) => {
                for (const racialTrait of raceData.traits) {
                    delete racialTrait._raceId;
                    delete racialTrait._traitId;
                }
                return raceData;
            })
        );
    }
}
