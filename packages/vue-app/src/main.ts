import { AppComponent, router } from '@dnd-mapp/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import '~bootstrap';

// Add Font Awesome icons.
library.add(faFilter, faTimes);

createApp(AppComponent)
    .use(createPinia())
    .use(router)
    // Make the Font Awesome Icon component available.
    .component('fa-icon', FontAwesomeIcon)
    .mount('#app');
