<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>
      <h3>Hi {{ data.email }}</h3>
    </div>
    <div>
      <button @click.prevent="onClickLogout">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {
      message: "",
      data: {
        email: "",
      },
    };
  },
  components: {
    HelloWorld,
  },
  computed: mapState({
    userFromState: (state) => state.user,
  }),
  created() {
    this.data.email = this.userFromState?.email;
  },
  methods: {
    async onClickLogout() {
      await this.$store.dispatch("logout");
    },
  },
};
</script>
