import { PaginationResponse, Race } from '@dnd-mapp/data';
import { HttpService } from '../http/http.service';

export class RaceService {
    static get instance(): RaceService {
        if (RaceService._instance === null) {
            RaceService._instance = new RaceService();
        }
        return RaceService._instance;
    }
    static _instance: RaceService | null = null;

    private httpService: HttpService;

    constructor() {
        this.httpService = HttpService.instance;
    }

    async getAll(): Promise<PaginationResponse<Race>> {
        return await this.httpService.get('http://localhost:8080/api/race');
    }

    async getById(raceId: number): Promise<Race> {
        return await this.httpService.get('http://localhost:8080/api/race/' + raceId);
    }
}
