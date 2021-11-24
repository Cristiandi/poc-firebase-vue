import { createApp } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebaseApp from "./firebase";

const auth = getAuth(firebaseApp);

let createdApp;

onAuthStateChanged(auth, (user) => {
  if (!createdApp) {
    createdApp = createApp(App).use(store).use(router).mount("#app");
  }

  if (user) {
    console.log("logged user");
    store
      .dispatch("setCurrentUser", user)
      .then(() => router.push("/home"))
      .catch((err) => {
        console.error("error making setCurrentUser", err);
        store.dispatch("logout");
      });
  } else {
    console.log("no user");
  }
});
