<template>
  <div id="app">
    <v-app>
      <Navbar />

      <Snackbar v-if="showSnack" />

      <v-container class="px-0 px-sm-2">
        <v-content fluid fill-height>
          <v-slide-x-reverse-transition :hide-on-leave="true">
            <router-view></router-view>
          </v-slide-x-reverse-transition>
        </v-content>

        <v-btn
          v-scroll="onScroll"
          v-show="fab"
          fab
          dark
          fixed
          bottom
          right
          color="primary"
          @click="toTop"
        >
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",

  components: {
    Navbar: () => import("@/components/Navbar"),
    Snackbar: () => import("@/components/Taskboard/Snackbar")
  },

  data: () => ({
    fab: false
  }),
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  },
  computed: {
    showSnack() {
      return this.$store.state.snackBar.show;
    }
  }
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  /* background: rgb(200,129,155); */
  /* background: radial-gradient(circle, rgba(200,129,155,1) 0%, rgba(136,37,73,1) 100%); */
  background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 1) 80%
    ),
    url("./assets/images/bg.png");
  background-size: 6%;
}

.bg-pic {
  position: fixed;
  right: 0px;
  top: -5px;
}
.v-btn:focus::before {
  background-color: rgba(138, 138, 218, 0.5);
  border: 1px solid rgb(19, 76, 184);
}

.fade-in {
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.5s;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>


