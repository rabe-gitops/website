import Vue from 'vue';

// GitHub Buttons plugin
import 'vue-github-buttons/dist/vue-github-buttons.css';
import VueGitHubButtons from 'vue-github-buttons';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueGitHubButtons, { useCache: true });

new Vue({
  render: (h) => h(App),
}).$mount('#app');
