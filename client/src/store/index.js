import { createStore } from 'vuex';
import tasks from './modules/tasks';
import auth from './modules/auth';
export default createStore({
  modules: {
    tasks,
    auth
  },
});

