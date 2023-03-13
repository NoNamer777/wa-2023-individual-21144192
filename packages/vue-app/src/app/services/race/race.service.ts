export class RaceService {
    get instance(): RaceService {
        if (RaceService._instance === null) {
            RaceService._instance = new RaceService();
        }
        return RaceService._instance;
    }
    static _instance: RaceService | null = null;
}
