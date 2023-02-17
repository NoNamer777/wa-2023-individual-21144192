class RaceService {
    static async instance() {
        if (!this.#instance) {
            this.#instance = new RaceService();

            await this.#instance.#initialize();
        }
        return this.#instance;
    }
    static #instance;

    #races = [];

    get numberOfRaces() {
        return this.#races.length;
    }

    async getRacesInRange() {
        const pageNumber = (await PaginationService.instance()).pageNumber;
        const maxItemsPerPage = (await PaginationService.instance()).maxItemsPerPage;

        return this.#races.slice((pageNumber - 1) * maxItemsPerPage, maxItemsPerPage * pageNumber);
    }

    async #initialize() {
        const races = await fetchJsonFile('assets/data/races');

        for (const raceName of races) {
            const raceData = await fetchJsonFile('assets/data/races/' + raceName);

            this.#races = [...this.#races, raceData];
        }
    }
}
