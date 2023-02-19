import { defineStore } from 'pinia';
import type { Race } from '@vue-project/app/models/race';
import { usePaginationStore } from '@vue-project/app/stores/pagination.store';

export interface RaceStoreState {
    filtered: Race[];
    races: Race[] | null;
}

async function fetchJson<T>(location: string): Promise<T> {
    return (await (await fetch(location + '.json')).json()) as Promise<T>;
}

export const useRaceStore = defineStore('races', {
    state: (): RaceStoreState => ({
        filtered: [],
        races: null,
    }),
    actions: {
        async initialize(): Promise<void> {
            const paginationStore = usePaginationStore();
            const racesList = await fetchJson<string[]>('./data/races');
            this.races = [];

            for (const raceName of racesList) {
                const race = await fetchJson<Race>('./data/races/' + raceName);
                this.races = [...this.races, race];
            }
            this.filtered = [...this.races];

            paginationStore.determineTotalNumberOfPages(this.filtered.length);
        },
    },
    getters: {
        getFilteredRaces(): Race[] {
            const paginationStore = usePaginationStore();
            const start = (paginationStore.getCurrentPage - 1) * paginationStore.getPageSize;
            const end = paginationStore.getCurrentPage * paginationStore.getPageSize;

            return this.filtered.slice(start, end);
        },
    },
});
