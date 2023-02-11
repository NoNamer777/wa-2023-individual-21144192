class RaceService {
    /** The available Races. */
    #races = [];

    /** Whether the service is done fetching the data. */
    initialized = Promise.any([this.#fetchRaces()]);

    /**
     * Fetches a portion of the available Races.
     * @param {number} maxNumberOfEntries The maximum amount of Races to get at a time.
     * @param {number} pageNumber The number of the specific slice of Races to get.
     */
    fetchPaginatedRaces(maxNumberOfEntries, pageNumber) {
        const start = (pageNumber - 1) * maxNumberOfEntries;
        const end = maxNumberOfEntries * pageNumber;

        return this.#races.slice(start, end);
    }

    /** Fetches the data of Races in their predefined order as determined in the `races.json`. */
    async #fetchRaces() {
        const racesToFetch = await fetchJsonFile('assets/data/races');

        for (const raceToFetch of racesToFetch) {
            const race = await fetchJsonFile(`assets/data/races/${raceToFetch}`);

            this.#races = [...this.#races, race];
        }
    }
}

const raceService = new RaceService();
