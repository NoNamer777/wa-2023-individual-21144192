<template>
    <footer class="flex-grow-0 flex-shrink-0">
        <nav class="navbar navbar-expand-lg bg-secondary border-top">
            <div class="container-fluid justify-content-start">
                <router-link to="/" class="navbar-brand">
                    <img :src="logo" alt="logo" class="logo" />
                    © 2023 DnD Mapp
                </router-link>
            </div>
        </nav>
    </footer>
</template>

<style scoped lang="scss">
footer {
    .navbar-brand {
        --bs-navbar-brand-font-size: 1em;
    }
}
</style>

<script setup lang="ts">
import logo from '@vue-app/assets/images/logo.png';
</script>
