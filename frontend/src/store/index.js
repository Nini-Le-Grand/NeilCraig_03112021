import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'


export default createStore({
  state: {
    token: "",
    isAdmin: false,
    userId: 0,
    email: "",
    firstName: "",
    lastName: "",
    position: "",
    description: "",
    imageUrl: "",
  },
  mutations: {
    initUser(state, user) {
      state.token = user.token;
      state.isAdmin = user.isAdmin;
      state.userId = user.userId;
      state.email = user.email;
      state.firstName = user.firstName;
      state.lastName = user.lastName;
      state.position = user.position;
      state.description = user.description;
      state.imageUrl = user.imageUrl;
    },
    refreshPicture(state, url) {
      state.imageUrl = url;
    },
    refreshProfile(state, res) {
      state.firstName = res.firstName;
      state.lastName = res.lastName;
      state.position = res.position;
      state.description = res.description;
    },
    
  },
  actions: {},
  plugins: [createPersistedState()],

  modules: {},
});
