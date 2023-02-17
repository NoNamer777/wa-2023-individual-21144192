import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@vue-project/app/App.vue';
import router from '@vue-project/app/router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
