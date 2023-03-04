<template>
    <header-component />
    <main class="overflow-auto py-3 flex-grow-1 flex-shrink-1">
        <center-component />
    </main>
    <footer-component />
</template>

<script setup lang="ts">
import CenterComponent from '@vue-project/app/components/center/center.component.vue';
import FooterComponent from '@vue-project/app/components/footer/footer.component.vue';
import HeaderComponent from '@vue-project/app/components/header/header.component.vue';
</script>
