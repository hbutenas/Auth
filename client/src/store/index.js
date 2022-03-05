import { createStore } from 'vuex';

export default createStore({
  state: {
    user_id: '',
    username: '',
    role: ''
  },
  mutations: {
    authenticateUser(state, { user_id, username, role }) {
      state.user_id = user_id;
      state.username = username;
      state.role = role;
    }
  },
  actions: {},
  modules: {}
});
