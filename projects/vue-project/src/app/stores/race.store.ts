import { defineStore } from 'pinia';
import type { Race } from '@vue-project/app/models/race';

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
            const racesList = await fetchJson<string[]>('./data/races');
            this.races = [];

            for (const raceName of racesList) {
                const race = await fetchJson<Race>('./data/races/' + raceName);
                this.races = [...this.races, race];
            }
            this.filtered = [...this.races];
        },
    },
    getters: {
        getFilteredRaces(): Race[] {
            return this.filtered;
        },
    },
});
