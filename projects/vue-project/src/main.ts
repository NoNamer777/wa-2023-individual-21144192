import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from '@vue-project/app/app.component.vue';
import { router } from '@vue-project/app/app-router';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

const app = createApp(App);

// Add Font Awesome icons.
library.add(faFilter, faTimes);

// Make the Font Awesome Icon component available.
app.component('fa-icon', FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount('#app');
