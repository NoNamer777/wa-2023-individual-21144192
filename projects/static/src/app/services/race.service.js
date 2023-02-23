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

    get races() {
        return this.#races;
    }
    #activeRaces = [];

    get numberOfRaces() {
        return this.#activeRaces.length;
    }

    async getRacesInRange(filters) {
        const pageNumber = (await PaginationService.instance()).pageNumber;
        const maxItemsPerPage = (await PaginationService.instance()).maxItemsPerPage;

        this.#activeRaces = this.#races
            .slice()
            .sort((r1, r2) => {
                switch (filters.sortingBy) {
                    case SORTABLE_ATTRIBUTES.name:
                        return this.#sortByName(filters.sortingDirection, r1.name, r2.name);
                    case SORTABLE_ATTRIBUTES.size:
                        return this.#sortBySize(filters.sortingDirection, r1, r2);
                    case SORTABLE_ATTRIBUTES.speed:
                        return this.#sortBySpeed(filters.sortingDirection, r1, r2);
                    default:
                        return this.#isSortingDirectionASC(filters.sortingDirection) ? 1 : -1;
                }
            })
            .filter((race) =>
                !filters.trait ? true : race.traits.map((trait) => trait.name).includes(filters.trait.name)
            );

        return this.#activeRaces.slice((pageNumber - 1) * maxItemsPerPage, maxItemsPerPage * pageNumber);
    }

    async #initialize() {
        const races = await fetchJsonFile('assets/data/races');

        for (const raceName of races) {
            const raceData = await fetchJsonFile('assets/data/races/' + raceName);

            this.#races = [...this.#races, raceData];
        }
        this.#activeRaces = this.#races.slice();
    }

    #sortByName(sortDirection, raceName1, raceName2) {
        if (raceName1.localeCompare(raceName2) === 0) return 0;

        return this.#isSortingDirectionASC(sortDirection)
            ? raceName1.localeCompare(raceName2)
            : raceName2.localeCompare(raceName1);
    }

    #sortBySize(sortingDirection, race1, race2) {
        const sizeDelta = this.#getRaceSizeValue(race1.size) - this.#getRaceSizeValue(race2.size);

        // Sort by name if size of the comparing Races is the same.
        if (sizeDelta === 0) {
            return this.#sortByName(sortingDirection, race1.name, race2.name);
        }
        return sizeDelta < 0 && this.#isSortingDirectionASC(sortingDirection) ? -1 : 1;
    }

    #sortBySpeed(sortingDirection, race1, race2) {
        const speedDelta = this.#isSortingDirectionASC(sortingDirection)
            ? race1.speed - race2.speed
            : race2.speed - race1.speed;

        // Sort by name if speed of the comparing Races is the same.
        if (speedDelta === 0) {
            return this.#sortByName(sortingDirection, race1.name, race2.name);
        }
        return speedDelta;
    }

    #getRaceSizeValue(size) {
        return SIZES[size.toLowerCase()];
    }

    #isSortingDirectionASC(sortingDirection) {
        return sortingDirection === SORTING_DIRECTIONS.ascending;
    }
}
