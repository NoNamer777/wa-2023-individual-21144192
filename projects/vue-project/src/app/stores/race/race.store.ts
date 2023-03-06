import { type Race, sizeOrder } from '@vue-project/app/models/race';
import { usePaginationStore } from '@vue-project/app/stores/pagination/pagination.store';
import type { TraitOption } from '@vue-project/app/models/race';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

async function fetchJson<T>(location: string): Promise<T> {
    return (await (await fetch(location + '.json')).json()) as Promise<T>;
}

export const useRaceStore = defineStore('races', () => {
    const paginationStore = usePaginationStore();

    const filtered = ref<Race[]>([]);
    const races = ref<Race[] | null>([]);

    async function initialize(): Promise<void> {
        const racesList = await fetchJson<string[]>('./data/races');
        races.value = [];

        for (const raceName of racesList) {
            const race = await fetchJson<Race>('./data/races/' + raceName);
            races.value = [...races.value, race];
        }
        filtered.value = [...races.value];

        paginationStore.determineTotalNumberOfPages(filtered.value.length);
    }

    function sortByName(name1: string, name2: string): number {
        return name1.localeCompare(name2);
    }

    function applySortingAndSorting(): void {
        let sortedRaces = [...filtered.value];

        if (paginationStore.getSortingOnAttribute) {
            sortedRaces.sort((r1, r2) => {
                const sortedByName = sortByName(r1.name, r2.name);

                switch (paginationStore.getSortingOnAttribute) {
                    case 'name':
                        return sortedByName;
                    case 'size':
                        const sizeDelta = sizeOrder[r1.size] - sizeOrder[r2.size];
                        return sizeDelta === 0 ? sortedByName : sizeDelta;
                    case 'speed':
                        const speedDelta = r1.speed - r2.speed;
                        return speedDelta === 0 ? sortedByName : speedDelta;
                    default:
                        return 1;
                }
            });
        }
        if (paginationStore.getSortingOrder === 'desc') {
            sortedRaces.reverse();
        }
        if (paginationStore.getFiltersByTrait) {
            const trait = getAllTraits.value.find((item) => item.value === paginationStore.getFiltersByTrait);

            if (!trait) {
                paginationStore.setFilters({ byTrait: null });
            } else {
                sortedRaces = sortedRaces.filter((race) =>
                    Boolean(race.traits.find((item) => item.name === trait.label))
                );
            }
        }
        filtered.value = [...sortedRaces];
        paginationStore.determineTotalNumberOfPages(sortedRaces.length);
    }

    function addNewRace(raceData: Race): void {
        races.value = [...(races.value as Race[]), raceData];

        paginationStore.determineTotalNumberOfPages(races.value.length);
    }

    const getFilteredRaces = computed<Race[]>(() => {
        const start = (paginationStore.getCurrentPage - 1) * paginationStore.getPageSize;
        const end = paginationStore.getCurrentPage * paginationStore.getPageSize;

        filtered.value = [...(races.value as Race[])];

        applySortingAndSorting();

        return filtered.value.slice(start, end);
    });

    const getAllTraits = computed<TraitOption[]>(() =>
        races
            .value!.flatMap((race) =>
                race.traits.map((trait) => ({
                    value: trait.name.toLowerCase().replace(/ /g, '-').replace(/'/g, ''),
                    label: trait.name,
                }))
            )
            .sort((t1, t2) => t1.value.localeCompare(t2.value))
            .filter((trait, position, self) => position === self.findIndex((tr) => tr.value === trait.value))
    );

    const getActiveCollectionSize = computed<number>(() => filtered.value.length);

    return { filtered, getFilteredRaces, getAllTraits, initialize, getActiveCollectionSize, addNewRace };
});
