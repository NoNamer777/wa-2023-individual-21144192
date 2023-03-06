<template>
    <section class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5">Create a new Race</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <form class="modal-body">
            <div class="mb-3">
                <label>Name</label>
                <input type="text" class="form-control" v-model="newRace.name" />
            </div>
            <div class="mb-3">
                <label>Speed</label>
                <input type="number" class="form-control" min="0" v-model="newRace.speed" />
            </div>
            <div class="mb-3">
                <label>Size</label>
                <select class="form-select" v-model="newRace.size">
                    <option :value="null"></option>
                    <template v-for="size of sizeOptions" :key="size">
                        <option :value="size">{{ size }}</option>
                    </template>
                </select>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <h5>Traits</h5>
                <button type="button" class="btn btn-primary" @click="onAddTrait">New Trait</button>
            </div>
            <hr />
            <!--TODO - Create separate component for editing Racial Traits-->
            <template v-if="newRace.traits.length > 0">
                <template v-for="trait of newRace.traits" :key="trait.name">
                    <div class="mb-3">
                        <label>Trait Name</label>
                        <input type="text" class="form-control" v-model="trait.name" />
                    </div>
                    <div class="mb-3">
                        <label>Description</label>
                        <textarea class="form-control" v-model="trait.description"></textarea>
                    </div>
                </template>
            </template>
            <p v-else>This Race currently has no Traits yet...</p>
        </form>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="onCreate">Create</button>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Race, Trait } from '@vue-project/app/models';
import { sizeOrder } from '@vue-project/app/models';
import { useRaceStore } from '@vue-project/app/stores';
import { ref } from 'vue';

const newRace = ref<Race>({ traits: [] as Trait[] } as Race);
const sizeOptions = ref<string[]>(Object.keys(sizeOrder));

function onAddTrait(): void {
    newRace.value.traits.push({ name: '', description: '' });
}

function onCreate(): void {
    useRaceStore().addNewRace(newRace.value);

    newRace.value = { traits: [] as Trait[] } as Race;
}
</script>
