<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-secondary border-bottom flex-grow-0 flex-shrink-0">
            <div class="container-fluid justify-content-start">
                <router-link to="/" class="navbar-brand">
                    <img src="@vue-project/assets/images/logo.png" alt="logo" class="logo" />
                    DnD 5e - Races
                </router-link>
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link to="/overview" class="nav-link">Overview</router-link>
                    </li>
                </ul>
                <pagination-component />
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import PaginationComponent from '@vue-project/app/components/header/pagination/pagination.component.vue';
</script>
