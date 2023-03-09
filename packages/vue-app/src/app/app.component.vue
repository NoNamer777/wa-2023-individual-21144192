<template>
    <header-component />
    <main class="overflow-auto py-3 flex-grow-1 flex-shrink-1">
        <center-component />
    </main>
    <footer-component />
</template>

<script setup lang="ts">
import { CenterComponent, FooterComponent, HeaderComponent } from '@vue-project/app/components';
</script>
