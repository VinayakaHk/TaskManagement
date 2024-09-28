import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Toast, { POSITION, useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";


loadFonts()
const app = createApp(App);
app.config.globalProperties.$toast = useToast();

const options = {
  closeOnClick: false,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  position: POSITION.TOP_CENTER,
  timeout: 5000,
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
};

app.use(router)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(Toast, options)
  .mount('#app')
