<template>
  <div id="app">
    <v-app>


<!-- <div class="bg"> -->

<!-- 
<svg class="tiny" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 320"><path fill="#A6617D" fill-opacity="1" d="M0,32L60,42.7C120,53,240,75,360,112C480,149,600,203,720,208C840,213,960,171,1080,149.3C1200,128,1320,128,1380,128L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
</svg> -->

 <svg  class="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#CFB4BF" fill-opacity="0.10" d="M0,64L80,74.7C160,85,320,107,480,149.3C640,192,800,256,960,277.3C1120,299,1280,277,1360,266.7L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>

<!--
<svg class="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#CFB4BF" fill-opacity="0.1" d="M0,288L120,272C240,256,480,224,720,224C960,224,1200,256,1320,272L1440,288L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg> -->




<svg class='absolute' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#E3E1E1" fill-opacity="0.3" d="M0,224L120,224C240,224,480,224,720,202.7C960,181,1200,139,1320,117.3L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg> 
<!-- </div> -->

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

.tiny{
  max-height: 85px;
}
#app {
  font-family: "Roboto", sans-serif;

background: linear-gradient(180deg, rgba(221, 221, 221, 0.2) 0%, rgba(136,37,73,0) 100%);
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


