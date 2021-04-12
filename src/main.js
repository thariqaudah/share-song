import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Project Auth firebase
import { projectAuth } from './firebase/config';

// Global styles
import './assets/main.css';

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .mount('#app');
  }
});
