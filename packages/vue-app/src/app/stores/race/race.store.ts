import { Race } from '@dnd-mapp/data';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface RaceData {
    [raceId: number]: Race;
}

export const useRaceStore = defineStore('races', () => {
    const races = ref<RaceData>({});

    function getRace(raceId: number): Race | null {
        return races.value[raceId] ?? null;
    }

    function addRace(race: Race): void {
        races.value = {
            ...races.value,
            [race.id]: race,
        };
    }

    function removeRace(raceId: number): void {
        const race = getRace(raceId);

        if (race) {
            delete races.value[raceId];
        }
    }

    return { races, getRace, addRace, removeRace };
});
