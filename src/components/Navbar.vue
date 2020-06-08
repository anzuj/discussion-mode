<template>
  <nav>
    <v-app-bar app color="transparent" flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
      <!-- <v-toolbar-title class="text-uppercase">{{title}}</v-toolbar-title> -->
    </v-app-bar>

    <v-navigation-drawer disable-resize-watcher v-model="drawer" app color="primary darken-2" 
>
      <v-list dark class="pt-3" dense>
        

        <v-list-item router to="/taskboard">
          <v-list-item-icon>
            <v-icon>mdi-flag-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Taskboard</v-list-item-title>
        </v-list-item>

        <v-list-item router to="/discussion">
          <v-list-item-icon>
            <v-icon>mdi-monitor</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Discussion mode</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>
        <div class="caption primary--text text-center">TEST PAGES</div>
        
        <v-list-item router to="/completion">
          <v-list-item-icon>
            <v-icon>mdi-check</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Completion screen</v-list-item-title>
        </v-list-item>

               <v-list-item router to="/">
          <v-list-item-icon>
            <v-icon>mdi-trophy</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Achievements</v-list-item-title>
        </v-list-item>

               <v-list-item router to="/intro">
          <v-list-item-icon>
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Intro</v-list-item-title>
        </v-list-item>

                 <v-list-item router to="/help">
          <v-list-item-icon>
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Help</v-list-item-title>
        </v-list-item>

      </v-list>

    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  components: {},
  name: "Navbar",
  computed: {
    title: function () {
      return this.$route.meta.title + (this.$route.params.id ? this.$route.params.id : '')
    }
  },

  data: () => ({
    drawer: false,
  })
};
</script>

<style>

.v-navigation-drawer__border{
 display: none;
}
.v-list-item__title {
  font-weight: 400 !important;
  font-size: 1.1rem !important;
  font-family: "Raleway", sans-serif;
  color: rgb(255, 255, 255);
}

.v-list-item__icon i{
  color: rgb(206, 169, 188) !important;
}
/* .v-list-item--active .v-list-item__title{
  color: blue !important;
}
.v-list-item--active {
  background: rgba(0, 0, 255, 0) !important;
} */
</style>
