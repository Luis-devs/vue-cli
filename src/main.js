import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';


//createApp.config.productionTip = false;
createApp(App).use(router).mount('#app')