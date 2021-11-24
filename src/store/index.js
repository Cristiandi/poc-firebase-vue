import { createStore } from "vuex";
import { getAuth } from "firebase/auth";

import router from "../router";
import firebaseApp from "../firebase";

import { getFirebaseProviderId } from "../utils";

export default createStore({
  state: {
    user: {},
  },
  mutations: {
    setUser(state, val) {
      state.user = val;
    },
  },
  actions: {
    async setCurrentUser({ commit }, user) {
      const providerId = getFirebaseProviderId();

      // set user in state
      commit("setUser", {
        ...user,
        providerId,
      });
    },
    async logout({ commit }) {
      const auth = getAuth(firebaseApp);

      if (auth.currentUser) await auth.signOut();

      // clear user and redirect to /
      commit("setUser", {});

      router.push("/");
    },
  },
  modules: {},
  getters: {
    user(state) {
      return state.user;
    },
  },
});
