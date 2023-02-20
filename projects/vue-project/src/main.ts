import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from '@vue-project/app/app.component.vue';
import { router } from '@vue-project/app/app-router';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import '~bootstrap';

// Add Font Awesome icons.
library.add(faFilter, faTimes);

createApp(App)
    .use(createPinia())
    .use(router)
    // Make the Font Awesome Icon component available.
    .component('fa-icon', FontAwesomeIcon)
    .mount('#app');
