import { Controller } from '@nestjs/common';
import { RaceService } from './race.service';

@Controller({
    path: 'api/race',
})
export class RaceController {
    constructor(private _raceService: RaceService) {}
}
