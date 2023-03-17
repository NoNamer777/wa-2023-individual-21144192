import { Trait } from '@dnd-mapp/data';
import { HttpService } from '../http/http.service';

export class TraitService {
    static get instance(): TraitService {
        if (TraitService._instance === null) {
            TraitService._instance = new TraitService();
        }
        return TraitService._instance;
    }
    private static _instance: TraitService | null = null;

    private httpService: HttpService;

    constructor() {
        console.log('TraitService - initialize');
        this.httpService = HttpService.instance;
    }

    async getAll(): Promise<Trait[]> {
        console.log('TraitService - get all');
        return await this.httpService.get('http://localhost:8080/api/trait');
    }
}
