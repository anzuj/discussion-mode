<template>
  <div id="app">
    <v-app>


<div class="bg">
<!-- <svg class="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 720"><path fill="#f9f9f9" fill-opacity="1" d="M0,320L34.3,288C68.6,256,137,192,206,170.7C274.3,149,343,171,411,181.3C480,192,549,192,617,197.3C685.7,203,754,213,823,229.3C891.4,245,960,267,1029,282.7C1097.1,299,1166,309,1234,298.7C1302.9,288,1371,256,1406,240L1440,224L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg> -->

<!-- <svg class="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f7f0f0" fill-opacity="0.7" d="M0,256L60,240C120,224,240,192,360,170.7C480,149,600,139,720,154.7C840,171,960,213,1080,192C1200,171,1320,85,1380,42.7L1440,0L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg> -->

<!-- <svg class="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f7f0f0" fill-opacity="0.3" d="M0,160L80,176C160,192,320,224,480,245.3C640,267,800,277,960,261.3C1120,245,1280,203,1360,181.3L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg> -->

<svg class="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f9f9f9" fill-opacity="0.7" d="M0,64L80,74.7C160,85,320,107,480,149.3C640,192,800,256,960,277.3C1120,299,1280,277,1360,266.7L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>



<svg class='absolute' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3e8ea" fill-opacity="0.3" d="M0,224L120,224C240,224,480,224,720,202.7C960,181,1200,139,1320,117.3L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg>
</div>

      <Navbar />

      <Snackbar v-if="showSnack" />

      <v-container class="content px-0 px-sm-2">
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
  /* background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 1) 80%
    ),
    url("./assets/images/bg.png");
  background-size: 6%; */
}

.bg{
  top: 0px;
  width: 100%;
  position: fixed; 
  /* z-index: -1000; */
  
}

.absolute{
  position: absolute;

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


