import App from './App';
import { createSSRApp } from 'vue';
import store from '@/store';

// 引入全局组件
// import cHeader from '@/components/custom-header/custom-header.vue';
// import Drawer from '@/components/drawer/drawer.vue';

// #ifdef VUE3
export function createApp() {
  const app = createSSRApp(App);
	// app.component('cHeader', cHeader);
	// app.component('Drawer', Drawer);
	app.use(store);
  return {
    app
  }
}
// #endif