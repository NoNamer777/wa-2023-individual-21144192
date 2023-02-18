import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@vue-project/app/app.component.vue';
import { router } from '@vue-project/app/app-router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
